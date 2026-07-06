import appError from '../utilities/globalError.js';
import httpStatusText from '../utilities/httpStatusText.js';

export default (middlewareFunc) => {
    return (req, res, next) => {
        middlewareFunc(req, res, next).catch((err) => {
            if (err?.code === 'P2002') {
                const error = appError.create(httpStatusText.fail, 400, err?.code === 'P2002' ? 'User is already taken' : 'Try later')
                return next(error);
            }
            next(err);
        })
    }
}