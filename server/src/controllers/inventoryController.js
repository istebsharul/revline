import Product from '../models/productSchema.js';
import Inventory from '../models/inventorySchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

// Create a new product and then add inventory details
export const createInventoryEntry = asyncErrors(async (req, res) => {
    const { year, make, model, carPart, variant, specification, quantity } = req.body;

    // Check if all required fields are present
    if (!year || !make || !model || !carPart || !quantity || quantity < 0) {
        return res.status(400).json({ message: 'All fields are required and quantity must be non-negative' });
    }

    // Create a new product
    const product = new Product({
        year,
        make,
        model,
        carPart,
        variant,
        specification
    });

    try {
        // Save the product
        await product.save();
        logger.info(`Product created successfully: ${product._id}`);

        // Create and save the inventory entry
        const status = quantity > 0 ? 'available' : 'out of stock';
        const inventory = new Inventory({
            productId: product._id,
            quantity,
            status
        });

        await inventory.save();
        logger.info(`Inventory entry created for product: ${product._id}`);

        res.status(201).json({ product, inventory });
    } catch (error) {
        logger.error(`Error creating product and inventory entry: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get all inventory entries
export const getAllInventoryEntries = asyncErrors(async (req, res) => {
    try {
        const inventoryEntries = await Inventory.find().populate('productId');
        logger.info('Fetched all inventory entries');
        res.status(200).json(inventoryEntries);
    } catch (error) {
        logger.error(`Error fetching inventory entries: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get a single inventory entry by ID
export const getInventoryEntryById = asyncErrors(async (req, res) => {
    try {
        const inventoryEntry = await Inventory.findById(req.params.id).populate('productId');
        if (!inventoryEntry) {
            logger.warn(`Inventory entry not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Inventory entry not found' });
        }
        logger.info(`Fetched inventory entry: ${inventoryEntry._id}`);
        res.status(200).json(inventoryEntry);
    } catch (error) {
        logger.error(`Error fetching inventory entry: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Update an inventory entry
export const updateInventoryEntry = asyncErrors(async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate quantity
        if (quantity < 0) {
            return res.status(400).json({ message: 'Quantity must be a non-negative number' });
        }

        // Check if the product exists
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const inventoryEntry = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!inventoryEntry) {
            logger.warn(`Inventory entry not found for update: ${req.params.id}`);
            return res.status(404).json({ message: 'Inventory entry not found' });
        }

        // Update status based on quantity
        const status = quantity > 0 ? 'available' : 'out of stock';
        inventoryEntry.status = status;
        await inventoryEntry.save();

        logger.info(`Inventory entry updated successfully: ${inventoryEntry._id}`);
        res.status(200).json(inventoryEntry);
    } catch (error) {
        logger.error(`Error updating inventory entry: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
});

// Delete Product Inventory
export const deleteInventoryEntry = asyncErrors(async (req, res) => {
    try {
        // Find and delete the inventory entry
        const inventoryEntry = await Inventory.findByIdAndDelete(req.params.id);

        if (!inventoryEntry) {
            logger.warn(`Inventory entry not found for deletion: ${req.params.id}`);
            return res.status(404).json({ message: 'Inventory entry not found' });
        }

        // Find and delete the associated product
        const productId = inventoryEntry.productId; // Assuming productId is a reference to the Product schema
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            logger.warn(`Product associated with inventory entry not found for deletion: ${productId}`);
            // Proceed with sending success message even if product is not found
        } else {
            logger.info(`Product deleted successfully: ${product._id}`);
        }

        logger.info(`Inventory entry deleted successfully: ${inventoryEntry._id}`);
        res.status(200).json({ message: 'Inventory entry and associated product deleted' });
    } catch (error) {
        logger.error(`Error deleting inventory entry and product: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});