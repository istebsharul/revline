import express from 'express';
import { getSalesRecords, createSalesRecord, updateSalesRecord } from '../controllers/salesManagementController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/sales').get(isAuthenticatedUser, authorizeRoles('admin'), getSalesRecords);
router.route('/sales').post(isAuthenticatedUser, authorizeRoles('admin'), createSalesRecord);
router.route('/sales/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateSalesRecord);

export default router;
