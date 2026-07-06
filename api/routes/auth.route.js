import express from 'express';
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js';
import middlewareHandler from '../middlewares/middlewareHandler.js';

const router = express.Router();

router.post('/register', middlewareHandler(registerController));

router.post('/login', middlewareHandler(loginController));

router.post('/logout', middlewareHandler(logoutController));

export default router;
