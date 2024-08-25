import Warranty from '../models/warrantyModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Get Warranty Information
export const getWarranty = asyncErrors(async (req, res) => {
    const { productId } = req.params;
    const warranty = await Warranty.findOne({ productId });

    if (!warranty) {
        return res.status(404).json({ message: 'Warranty not found' });
    }

    res.status(200).json({ warranty });
});

// Create/Update Warranty (Admin)
export const createOrUpdateWarranty = asyncErrors(async (req, res) => {
    const { productId, warrantyPeriod, warrantyStartDate, warrantyEndDate, warrantyTerms } = req.body;

    const warranty = await Warranty.findOneAndUpdate(
        { productId },
        { warrantyPeriod, warrantyStartDate, warrantyEndDate, warrantyTerms },
        { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Warranty information updated', warranty });
});
