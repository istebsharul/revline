import SalesManagement from '../models/salesManagementModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Get Sales Records
export const getSalesRecords = asyncErrors(async (req, res) => {
    const sales = await SalesManagement.find();

    res.status(200).json({ sales });
});

// Create Sales Record
export const createSalesRecord = asyncErrors(async (req, res) => {
    const { userId, customerName, quotation, invoice, status } = req.body;

    const sale = new SalesManagement({
        userId,
        customerName,
        quotation,
        invoice,
        status
    });

    await sale.save();

    res.status(201).json({ message: 'Sales record created', sale });
});

// Update Sales Record
export const updateSalesRecord = asyncErrors(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sale = await SalesManagement.findByIdAndUpdate(
        id,
        { status, updatedAt: Date.now() },
        { new: true }
    );

    if (!sale) {
        return res.status(404).json({ message: 'Sales record not found' });
    }

    res.status(200).json({ message: 'Sales record updated', sale });
});
