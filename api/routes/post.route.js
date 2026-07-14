import express from 'express';
import {
    addPostController,
    getAllPostsController,
    getPostController,
    updatePostController,
    deletePostController,
    savePostController,
    userPostsController
} from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import middlewareHandler from '../middlewares/middlewareHandler.js';

const router = express.Router();

router.get('/', middlewareHandler(getAllPostsController))
router.get('/user/profile', verifyToken, middlewareHandler(userPostsController))
router.post('/', verifyToken, middlewareHandler(addPostController))
router.patch('/:id', verifyToken, middlewareHandler(updatePostController))
router.delete('/:id', verifyToken, middlewareHandler(deletePostController))
router.post('/:id/save', verifyToken, middlewareHandler(savePostController))
router.get('/:id', middlewareHandler(getPostController))

export default router;