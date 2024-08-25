import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getProductById);
router.route('/products').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route('/products/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/products/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

export default router;
