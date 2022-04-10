import { Router, Request, Response } from 'express';
import { UserController } from '../../controllers/userController';
import { Authentication } from '../../middlewares/authenication';

export const UserRoute: Router = Router();

UserRoute.get('/list', async (req: Request, res: Response) => {
    return await UserController.getAllUsers(res);
});

UserRoute.get('/login', async (req: Request, res: Response) => {
    return await UserController.userLogin(req, res);
});

UserRoute.get('/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await UserController.getUserById(req, res);
});

UserRoute.post('/', async (req: Request, res: Response) => {
    return await UserController.createUser(req, res);
});

UserRoute.put('/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await UserController.updateUser(req, res);
});

UserRoute.delete('/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await UserController.deleteUserById(req, res);
});
