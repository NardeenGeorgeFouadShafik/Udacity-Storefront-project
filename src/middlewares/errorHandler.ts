import { Response } from 'express';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';

export class ErrorHandler {
    constructor() {}

    public static sendCorrectError(res: Response, errorCode: ErrorCode, errorMsg: ErrorMsg | string): Response {
        return res.status(errorCode).json({ code: errorCode, message: errorMsg });
    }
}
