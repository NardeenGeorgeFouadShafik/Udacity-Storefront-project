import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from './errorHandler';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';

export class Authentication {
    constructor() {}

    public static validateAuthToken(req: Request, res: Response, next: NextFunction): void | Response {
        try {
            const authHead: string | undefined = req.headers.authorization;
            if (authHead) {
                const token: string = authHead ? authHead.split(' ')[1] : '';
                const decoded: string | jsonwebtoken.JwtPayload = jsonwebtoken.verify(
                    token,
                    process.env.JWT_SECRET as string,
                );
                res.locals.userData = decoded;
                return next();
            }
            return ErrorHandler.sendCorrectError(res, ErrorCode.UnauthorizedError, ErrorMsg.Auth_MissingToken);
        } catch (err) {
            return ErrorHandler.sendCorrectError(res, ErrorCode.UnauthorizedError, ErrorMsg.Auth_InvalidToken);
        }
    }
}
