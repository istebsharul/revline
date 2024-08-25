import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout',logoutUser);
router.post('/forgot-password',forgotPassword);
router.put('/reset-password/:token',resetPassword);

export default router;
