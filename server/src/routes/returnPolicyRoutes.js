import express from 'express';
import { getReturnPolicy, createOrUpdateReturnPolicy } from '../controllers/returnPolicyController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/returns/:productId').get(getReturnPolicy);
router.route('/returns').post(isAuthenticatedUser, authorizeRoles('admin'), createOrUpdateReturnPolicy);

export default router;
