import express from 'express';
import { registerAdmin, loginAdmin, forgotPassword, resetPassword, logoutAdmin, adminProfile, verifyOtp } from '../controllers/adminAuthController.js';
import adminAuthMiddleware from '../middlewares/adminAuth.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/logout',logoutAdmin);
router.post('/forgot-password',forgotPassword);
router.put('/reset-password/:token',resetPassword);
router.get('/profile',adminAuthMiddleware,adminProfile);
router.post('/verify-otp',verifyOtp);

export default router;
