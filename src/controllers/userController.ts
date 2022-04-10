import express from 'express';
import { ErrorHandler } from '../middlewares/errorHandler';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { IUser, IUserLogin } from '../models/user.model';
import { UserValidator } from '../validators/userValidator';
import { UserService } from '../services/userService';

export class UserController {
    constructor() {}

    public static async getAllUsers(res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await UserService.getAllUsers()));
        } catch (e) {
            return ErrorHandler.sendCorrectError(
                res,
                ErrorCode.InternalServerError,
                ErrorMsg.General_InternalServerError,
            );
        }
    }

    public static async getUserById(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await UserService.getUserById(parseInt(res.locals.userData.user_id))));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async createUser(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const user: IUser = UserValidator.validateUser(req);
            return res.json(await UserService.createUser(user));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async updateUser(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const user: IUser = UserValidator.validateUser(req);
            return Promise.resolve(res.json(await UserService.updateUser(user, parseInt(res.locals.userData.user_id))));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async deleteUserById(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await UserService.deleteUserById(res.locals.userData.user_id)));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async userLogin(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const userLogin: IUserLogin = UserValidator.validateUserLogin(req);
            return Promise.resolve(res.json(await UserService.userLogin(userLogin)));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }
}
