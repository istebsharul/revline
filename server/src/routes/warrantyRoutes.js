import express from 'express';
import { getWarranty, createOrUpdateWarranty } from '../controllers/warrantyController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/warranty/:productId').get(getWarranty);
router.route('/warranty').post(isAuthenticatedUser, authorizeRoles('admin'), createOrUpdateWarranty);

export default router;
