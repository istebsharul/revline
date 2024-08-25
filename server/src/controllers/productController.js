import Product from '../models/productModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

/**
 * Get All Products
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getAllProducts = asyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
    logger.info('Fetched all products successfully');
});

/**
 * Get Single Product
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getProductById = asyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
    logger.info(`Fetched product successfully: ${req.params.id}`);
});

/**
 * Create Product (Admin)
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createProduct = asyncErrors(async (req, res) => {
    const { name, description, price, category, images } = req.body;
    const product = await Product.create({ name, description, price, category, images });
    res.status(201).json({ success: true, message: 'Product created successfully', product });
    logger.info(`Product created successfully: ${product._id}`);
});

/**
 * Update Product (Admin)
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const updateProduct = asyncErrors(async (req, res) => {
    const { name, description, price, category, images } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category, images, updatedAt: Date.now() },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Product updated successfully', product });
    logger.info(`Product updated successfully: ${req.params.id}`);
});

/**
 * Delete Product (Admin)
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const deleteProduct = asyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.remove();

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
    logger.info(`Product deleted successfully: ${req.params.id}`);
});
