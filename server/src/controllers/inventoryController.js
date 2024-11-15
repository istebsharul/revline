import Product from '../models/productSchema.js';
import Inventory from '../models/inventorySchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';
import fs, { stat } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import Part from '../models/parts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Create a new product and then add inventory details
export const createInventoryEntry = asyncErrors(async (req, res) => {
    const { year, make, model, part, variant, transmission, description, grade, sku, price, contact, quantity } = req.body;

    // Check if all required fields are present
    if (!year || !make || !model || !part || !variant || !transmission || !description || !grade || !sku || !price || !contact || quantity == null || quantity < 0) {
        return res.status(400).json({ message: 'All fields are required and quantity must be non-negative' });
    }

    // Create a new product
    const product = new Product({
        year,
        make,
        model,
        part,
        variant,
        transmission,
        description,
        grade,
        sku,
        price,
        contact
    });

    try {
        // Save the product
        await product.save();
        logger.info(`Product created successfully: ${product._id}`);

        // Create and save the inventory entry
        const status = quantity > 0 ? 'available' : 'out of stock';
        const inventory = new Inventory({
            product: product._id,
            quantity,
            status
        });

        await inventory.save();
        logger.info(`Inventory entry created for product: ${product._id}`);

        // Calculate and log the response size
        const responseSize = Buffer.byteLength(JSON.stringify(inventory), 'utf8');
        console.log(`Inventory size: ${responseSize} bytes`);

        res.status(201).json({ product, inventory });
    } catch (error) {
        logger.error(`Error creating product and inventory entry: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get all inventory entries
export const getAllInventoryEntrie = asyncErrors(async (req, res) => {
    try {
        const inventoryEntries = await Inventory.find().populate('product');
        logger.info('Fetched all inventory entries');
        res.status(200).json(inventoryEntries);
    } catch (error) {
        logger.error(`Error fetching inventory entries: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export const getAllInventoryEntries = asyncErrors(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Validate page and limit
        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be greater than zero' });
        }

        const skip = (page - 1) * limit;

        // Fetch inventory entries
        const inventories = await Inventory.find()
            .skip(skip)
            .limit(limit)
            .populate('product');

        const totalProducts = await Inventory.countDocuments();

        res.json({
            inventories,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                pageSize: limit,
            },
        });

        logger.info('Fetched products successfully');
    } catch (error) {
        logger.error('Error fetching products', { error: error.message });
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get a single inventory entry by ID
export const getInventoryEntryById = asyncErrors(async (req, res) => {
    try {
        const inventoryEntry = await Inventory.findById(req.params.id).populate('product');
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
        console.log(req.body.product?._id);
        const { quantity } = req.body;
        const productId = req.body.product?._id;
        console.log(productId, quantity);
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
        const productId = inventoryEntry.product; // Assuming productId is a reference to the Product schema
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


const uploadsDir = path.join(__dirname, '../uploads/');

export const importProducts = asyncErrors(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const products = [];
    const inventories = [];
    const filePath = path.join(uploadsDir, req.file.filename);
    console.log('File Path:', filePath);
    console.log('Filename:', req.file.filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File not found' });
    }

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            console.log('Row Data:', row); // Log each row of data
            if (row.year && row.make && row.model && row.part && row.variant && row.transmission && row.description && row.grade && row.sku && row.price && row.contact && row.quantity) {
                const product = new Product({
                    year: row.year,
                    make: row.make,
                    model: row.model,
                    part: row.part,
                    variant: row.variant || '',
                    transmission: row.transmission || '',
                    description: row.description || '', // Assuming specification corresponds to description
                    grade: row.grade || 'N/A', // Assuming grade might be added in the future
                    sku: row.sku || 'N/A', // Assuming SKU might be added in the future
                    price: row.price || 'N/A', // Assuming price might be added in the future
                    contact: row.contact || 'N/A', // Added contact field
                });

                products.push(product);

                const quantity = parseInt(row.quantity, 10);
                const status = quantity > 0 ? 'available' : 'out of stock';
                const inventory = {
                    product: product._id, // This will be assigned after saving the product
                    quantity,
                    status
                };

                inventories.push(inventory);
            } else {
                console.warn('Skipped row due to missing fields:', row);
            }
        })
        .on('end', async () => {
            try {
                if (products.length > 0) {
                    // Save all products first
                    const savedProducts = await Product.insertMany(products);
                    console.info(`Imported ${savedProducts.length} products successfully`);

                    // Now, create inventory entries with the saved product IDs
                    for (let i = 0; i < savedProducts.length; i++) {
                        inventories[i].product = savedProducts[i]._id;
                    }

                    await Inventory.insertMany(inventories);
                    console.info(`Created ${inventories.length} inventory entries successfully`);

                    res.status(201).json({ message: 'Products and inventories imported successfully', products: savedProducts });
                } else {
                    res.status(400).json({ message: 'No valid products found in the file' });
                }
            } catch (error) {
                console.error('Failed to import products and inventories:', error);
                res.status(500).json({ message: 'Failed to import products and inventories' });
            } finally {
                // Ensure file is deleted after processing
                try {
                    fs.unlinkSync(filePath);
                } catch (unlinkError) {
                    console.error('Failed to delete uploaded file:', unlinkError);
                }
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error processing file' });
            // Ensure file is deleted on error
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkError) {
                console.error('Failed to delete uploaded file:', unlinkError);
            }
        });
});

export const importParts =(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const parts = [];
    const filePath = path.join(uploadsDir, req.file.filename);
    console.log('File Path:', filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File not found' });
    }

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            console.log('Row Data:', row); // Log each row of data
            if (row.name && row.shipping_cost && row.size) {
                const part = new Part({
                    part_name: row.name,
                    shipping_cost: parseFloat(row.shipping_cost),
                    size: row.size
                });
                parts.push(part);
            } else {
                console.warn('Skipped row due to missing fields:', row);
            }
        })
        .on('end', async () => {
            try {
                if (parts.length > 0) {
                    const savedParts = await Part.insertMany(parts);
                    console.info(`Imported ${savedParts.length} parts successfully`);
                    res.status(201).json({ message: 'Parts imported successfully', parts: savedParts });
                } else {
                    res.status(400).json({ message: 'No valid parts found in the file' });
                }
            } catch (error) {
                console.error('Failed to import parts:', error);
                res.status(500).json({ message: 'Failed to import parts' });
            } finally {
                try {
                    fs.unlinkSync(filePath);
                } catch (unlinkError) {
                    console.error('Failed to delete uploaded file:', unlinkError);
                }
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error processing file' });
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkError) {
                console.error('Failed to delete uploaded file:', unlinkError);
            }
        });
});