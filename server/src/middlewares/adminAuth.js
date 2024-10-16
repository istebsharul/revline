import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import asyncErrors from './catchAsyncErrors.js';
import ErrorHandler from '../utils/errorhandler.js'
import Admin from '../models/adminSchema.js';

dotenv.config();

const adminAuthMiddleware = asyncErrors(async(req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
      return next(new ErrorHandler('Please login to access this', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.admin = await Admin.findById(decodedData.id); //req.user is any js object consisting of all details of an user

  next();
});

export default adminAuthMiddleware;
