import express from 'express';
import { logCommunication, getCommunicationLogs } from '../controllers/communicationLogsController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/communication/log').post(isAuthenticatedUser, authorizeRoles('admin'), logCommunication);
router.route('/communication/logs/:userId').get(isAuthenticatedUser, getCommunicationLogs);

export default router;
