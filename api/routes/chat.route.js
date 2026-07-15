import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import middlewareHandler from '../middlewares/middlewareHandler.js';
import { addChatController, getChatController, getChatsController, readChatController } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/', verifyToken, middlewareHandler(getChatsController));
router.post('/', verifyToken, middlewareHandler(addChatController));
router.get('/:id', verifyToken, middlewareHandler(getChatController));
router.put('/:id/read', verifyToken, middlewareHandler(readChatController));

export default router;