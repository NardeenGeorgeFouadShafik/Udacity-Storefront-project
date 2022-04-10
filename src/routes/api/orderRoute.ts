import { Router, Response, Request } from 'express';
import { OrderController } from '../../controllers/orderController';
import { Authentication } from '../../middlewares/authenication';
import { Authorization } from '../../middlewares/authorization';
import { UserRole } from '../../models/user.model';

export const OrderRoute: Router = Router();

OrderRoute.get('/list', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await OrderController.getOrdersByUserId(req, res);
});

OrderRoute.get('/requested/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await OrderController.getRequestedOrdersByUserId(req, res);
});

OrderRoute.get('/delivered/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await OrderController.getDeliveredOrdersByUserId(req, res);
});

OrderRoute.post('/', Authentication.validateAuthToken, async (req: Request, res: Response) => {
    return await OrderController.createOrder(req, res);
});

OrderRoute.put(
    '/',
    [Authentication.validateAuthToken, Authorization.permit([UserRole.admin])],
    async (req: Request, res: Response) => {
        return await OrderController.updateOrderStatus(req, res);
    },
);

OrderRoute.delete(
    '/:id',
    [Authentication.validateAuthToken, Authorization.permit([UserRole.admin])],
    async (req: Request, res: Response) => {
        return await OrderController.deleteOrderById(req, res);
    },
);
