import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, logoutUser, userProfile } from '../controllers/authController.js';
import userAuthMiddleware from '../middlewares/userAuth.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout',logoutUser);
router.post('/forgot-password',forgotPassword);
router.put('/reset-password/:token',resetPassword);
router.get('/profile',userAuthMiddleware,userProfile);

export default router;
