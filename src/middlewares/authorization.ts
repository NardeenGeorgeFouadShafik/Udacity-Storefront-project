import express, { NextFunction, RequestHandler } from 'express';
import { ErrorHandler } from './errorHandler';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';

export class Authorization {
    public static permit(allowedRoles: number[]): RequestHandler {
        return function (req: express.Request, res: express.Response, next: NextFunction) {
            if (allowedRoles.includes(res.locals.userData.user_role)) return next();
            return ErrorHandler.sendCorrectError(
                res,
                ErrorCode.UnauthorizedError,
                ErrorMsg.General_InsufficientPermissions,
            );
        };
    }
}
