import express from "express";
import { updateUserController, deleteUserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import middlewareHandler from "../middlewares/middlewareHandler.js";

const router = express.Router();

router.put('/update', verifyToken, middlewareHandler(updateUserController));
router.delete('/me', verifyToken, middlewareHandler(deleteUserController));

export default router;

