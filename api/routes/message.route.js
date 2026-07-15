import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import middlewareHandler from '../middlewares/middlewareHandler.js';
import { addMessageController, getMessagesController } from '../controllers/message.controller.js';

const router = express.Router();

// router.get('/:chatId', verifyToken, middlewareHandler(getMessagesController));
router.post('/', verifyToken, middlewareHandler(addMessageController));

export default router;