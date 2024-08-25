import ReturnPolicy from '../models/returnPolicyModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Get Return Policy
export const getReturnPolicy = asyncErrors(async (req, res) => {
    const { productId } = req.params;
    const returnPolicy = await ReturnPolicy.findOne({ productId });

    if (!returnPolicy) {
        return res.status(404).json({ message: 'Return policy not found' });
    }

    res.status(200).json({ returnPolicy });
});

// Create/Update Return Policy (Admin)
export const createOrUpdateReturnPolicy = asyncErrors(async (req, res) => {
    const { productId, returnPeriod, returnConditions, returnAddress } = req.body;

    const returnPolicy = await ReturnPolicy.findOneAndUpdate(
        { productId },
        { returnPeriod, returnConditions, returnAddress },
        { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Return policy updated', returnPolicy });
});
