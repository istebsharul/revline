import Product from '../models/productSchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

// Create a new product
export const createProduct = asyncErrors(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    logger.info(`Product created successfully: ${product._id}`);
    res.status(201).json(product);
});

// Get all products
export const getAllProducts = asyncErrors(async (req, res) => {
    const products = await Product.find();
    logger.info('Fetched all products');
    res.status(200).json(products);
});

// Get a single product by ID
export const getProductById = asyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        logger.warn(`Product not found: ${req.params.id}`);
        return res.status(404).json({ message: 'Product not found' });
    }
    logger.info(`Fetched product: ${product._id}`);
    res.status(200).json(product);
});

// Update a product
export const updateProduct = asyncErrors(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        logger.warn(`Product not found for update: ${req.params.id}`);
        return res.status(404).json({ message: 'Product not found' });
    }
    logger.info(`Product updated successfully: ${product._id}`);
    res.status(200).json(product);
});

// Delete a product
export const deleteProduct = asyncErrors(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        logger.warn(`Product not found for deletion: ${req.params.id}`);
        return res.status(404).json({ message: 'Product not found' });
    }
    logger.info(`Product deleted successfully: ${product._id}`);
    res.status(200).json({ message: 'Product deleted' });
});
