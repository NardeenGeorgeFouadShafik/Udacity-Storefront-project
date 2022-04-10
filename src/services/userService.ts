import { UserEntity } from '../entities/userEntity';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { IUser, IUserLogin, IUserReturnedToken } from '../models/user.model';
import { UserValidator } from '../validators/userValidator';
import bcrypt from 'bcrypt';
import { JsonWebTokenHelper } from '../helpers/jsonWebToken';

export class UserService {
    constructor() {}
    public static pepper: string = process.env.BCRYPT_PASSWORD as string;

    public static async getAllUsers(): Promise<IUser[]> {
        try {
            return Promise.resolve(await UserEntity.getUsers());
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async getUserById(userId: number): Promise<IUser> {
        try {
            if (userId) {
                const user: IUser = await UserEntity.getUserById(userId);
                if (!user) {
                    return Promise.reject({
                        errorCode: ErrorCode.NotFoundError,
                        errorMessage: ErrorMsg.General_NotFoundError,
                    });
                }
                return Promise.resolve(user);
            }
            return Promise.reject({ errorCode: ErrorCode.BadRequestError, errorMessage: ErrorMsg.User_MissingId });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async createUser(user: IUser): Promise<IUserReturnedToken> {
        try {
            if (!user.first_name || !user.last_name || !user.email || !user.password || !user.role) {
                return Promise.reject(UserValidator.returnUserError(user));
            }
            const userByEmail: IUser = await UserEntity.getUserByEmail(user.email);
            if (userByEmail) {
                return Promise.reject({
                    errorCode: ErrorCode.BadRequestError,
                    errorMessage: ErrorMsg.User_EmailIsAlreadyExist,
                });
            }
            return Promise.resolve(await UserEntity.createUser(user));
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async updateUser(user: IUser, userId: number): Promise<IUser> {
        try {
            if (!user.first_name || !user.last_name || !user.email || !user.password || !user.role) {
                return Promise.reject(UserValidator.returnUserError(user));
            }
            const userByEmail: IUser = await UserEntity.getUserByEmail(user.email);
            if (userByEmail) {
                return Promise.reject({
                    errorCode: ErrorCode.BadRequestError,
                    errorMessage: ErrorMsg.User_EmailIsAlreadyExist,
                });
            }
            return Promise.resolve(await UserEntity.updateUser(user, userId));
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async deleteUserById(userId: number): Promise<IUser> {
        try {
            return Promise.resolve(await UserEntity.deleteUser(userId));
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async userLogin(userLogin: IUserLogin): Promise<IUserReturnedToken> {
        try {
            if (!userLogin.email || !userLogin.password) {
                return Promise.reject(UserValidator.returnUserLoginError(userLogin));
            }
            const user: IUser = await UserEntity.getUserByEmail(userLogin.email);
            if (user) {
                const isTruePassword = await bcrypt.compare(userLogin.password + UserService.pepper, user.password);
                if (isTruePassword) {
                    const token: string = JsonWebTokenHelper.generateJWT(user.id!, user.role);
                    return Promise.resolve({ token });
                }
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Auth_InvalidCredential,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }
}
