import express from 'express';
import { getInventory, updateInventory } from '../controllers/inventoryController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Get Product Inventory
router.route('/inventory/:productId').get(getInventory);

// Update Product Inventory (Admin)
router.route('/inventory/:productId')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateInventory);

export default router;
