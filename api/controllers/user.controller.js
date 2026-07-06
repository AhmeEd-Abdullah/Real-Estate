import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt';
import appError from '../utilities/globalError.js';
import httpStatusText from "../utilities/httpStatusText.js";

export const updateUserController = async (req, res, next) => {
    const tokenId = req.userId;

    if (!tokenId) {
        return next(appError.create(httpStatusText.fail, 401, 'Not Authorized'))
    }

    const { password, avatar, ...restBody } = req.body;

    let newPassword = null;
    if (password) {
        newPassword = await bcrypt.hash(password, 10);
    }

    const { password: userPassword, ...updatedData } = await prisma.user.update({
        where: { id: tokenId },
        data: {
            ...restBody,
            ...(newPassword && { password: newPassword }),
            ...(avatar && { avatar })
        }
    });

    res.status(200).json({
        "success": true,
        "message": "Data Updated successfully",
        "data": updatedData
    });
};

export const deleteUserController = async (req, res, next) => {
    const tokenId = req.userId;

    if (!tokenId) {
        return next(appError.create(httpStatusText.fail, 401, 'Not Authorized'));
    }

    try {
        await prisma.user.delete({
            where: { id: tokenId }
        });

        res.status(200).json({
            "success": true,
            "message": "User Deleted successfully"
        });
    } catch (error) {
        next(appError.create(httpStatusText.error, 500, 'Something went wrong'));
    }
};