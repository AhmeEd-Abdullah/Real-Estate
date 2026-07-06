import express from 'express';
import {
    addPostController,
    getAllPostsController,
    getPostController,
    updatePostController,
    deletePostController
} from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import middlewareHandler from '../middlewares/middlewareHandler.js';

const router = express.Router();

router.get('/', middlewareHandler(getAllPostsController))
router.get('/:id', middlewareHandler(getPostController))
router.post('/', verifyToken, middlewareHandler(addPostController))
router.patch('/:id', verifyToken, middlewareHandler(updatePostController))
router.delete('/:id', verifyToken, middlewareHandler(deletePostController))

export default router;