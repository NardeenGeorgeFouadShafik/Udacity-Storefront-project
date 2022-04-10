import { IUser, IUserLogin } from '../models/user.model';
import { Request } from 'express';
import { ErrorCode, ErrorMsg, ErrorResponse } from '../models/apiResponse';
import { UserEntity } from '../entities/userEntity';

export class UserValidator {
    constructor() {}

    public static validateUser(req: Request): IUser {
        return {
            first_name: req.body.first_name ? req.body.first_name : null,
            last_name: req.body.last_name ? req.body.last_name : null,
            email: req.body.email ? req.body.email : null,
            password: req.body.password ? req.body.password : null,
            role: req.body.role ? req.body.role : null,
        };
    }
    public static validateUserLogin(req: Request): IUserLogin {
        return {
            email: req.query.email ? (req.query.email as string) : '',
            password: req.query.password ? (req.query.password as string) : '',
        };
    }

    public static returnUserLoginError(user: IUserLogin): ErrorResponse {
        let errorMsg = '';
        if (!user.email) errorMsg += ErrorMsg.User_MissingEmail + ' ';
        if (!user.password) errorMsg += ErrorMsg.User_MissingPassword + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }

    public static returnUserError(user: IUser): ErrorResponse {
        let errorMsg = '';
        if (!user.first_name) errorMsg += ErrorMsg.User_MissingFirstName + ' ';
        if (!user.last_name) errorMsg += ErrorMsg.User_MissingLastName + ' ';
        if (!user.email) errorMsg += ErrorMsg.User_MissingEmail + ' ';
        if (!user.password) errorMsg += ErrorMsg.User_MissingPassword + ' ';
        if (!user.role) errorMsg += ErrorMsg.User_MissingRole + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }

    public static async isUserExist(id: number): Promise<boolean> {
        try {
            const user = await UserEntity.getUserById(id);
            return Promise.resolve(!!user);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
