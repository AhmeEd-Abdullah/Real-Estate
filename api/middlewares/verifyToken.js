import jwt from "jsonwebtoken";
import httpStatusText from "../utilities/httpStatusText.js";
import appError from '../utilities/globalError.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        const error = appError.create(httpStatusText.fail, 401, 'Not Authorized')
        return next(error);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            const error = appError.create(httpStatusText.fail, 403, err?.message ? err?.message : 'No Permission')
            return next(error);
        }
        req.userId = payload.id;
        next();
    })
}