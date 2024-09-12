import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', createProduct);           // POST /api/products/
router.get('/list', getAllProducts);           // GET /api/products/
router.get('/:id', getProductById);        // GET /api/products/:id
router.put('/:id', updateProduct);         // PUT /api/products/:id
router.delete('/:id', deleteProduct);      // DELETE /api/products/:id

export default router;
