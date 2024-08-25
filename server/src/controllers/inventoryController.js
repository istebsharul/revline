import Inventory from '../models/inventoryModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

/**
 * Get Product Inventory
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const getInventory = asyncErrors(async (req, res) => {
    const { productId } = req.params;

    const inventory = await Inventory.findOne({ productId });

    if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ inventory });
});

/**
 * Update Product Inventory (Admin)
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const updateInventory = asyncErrors(async (req, res) => {
    const { productId } = req.params;
    const { stockQuantity, reorderLevel, supplierInfo } = req.body;

    const inventory = await Inventory.findOneAndUpdate(
        { productId },
        { stockQuantity, reorderLevel, supplierInfo },
        { new: true, runValidators: true }
    );

    if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ message: 'Inventory updated successfully', inventory });
});
