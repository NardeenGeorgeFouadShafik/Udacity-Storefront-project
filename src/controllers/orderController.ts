import {OrderEntity} from '../entities/orderEntity';
import express from 'express';
import {ErrorHandler} from '../middlewares/errorHandler';
import {ErrorCode, ErrorMsg} from '../models/apiResponse';
import {IOrder, OrderStatus} from '../models/order.model';
import {OrderValidator} from '../validators/orderValidator';
import {OrderService} from '../services/orderService';

export class OrderController {
    constructor() {
    }

    public static async getOrdersByUserId(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(
                res.json(await OrderService.getOrdersByUserId(parseInt(res.locals.userData.user_id))),
            );
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async getDeliveredOrdersByUserId(
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> {
        try {
            return Promise.resolve(
                res.json(await OrderService.getDeliveredOrdersByUserId(parseInt(res.locals.userData.user_id))),
            );
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async getRequestedOrdersByUserId(
        req: express.Request,
        res: express.Response,
    ): Promise<express.Response> {
        try {
            return Promise.resolve(
                res.json(await OrderService.getRequestedOrdersByUserId(parseInt(res.locals.userData.user_id))),
            );
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async createOrder(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const order: IOrder = OrderValidator.validateOrder(req, res);
            return Promise.resolve(res.json(await OrderService.createOrder(order)));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async updateOrderStatus(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(
                res.json(await OrderService.updateOrderStatus(parseInt(req.query.orderId as string), req.query.status as string))
            );
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async deleteOrderById(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const orderId: number = parseInt(req.params.id);
            if (orderId) {
                return Promise.resolve(res.json(await OrderService.deleteOrderById(orderId)));
            }
            return Promise.reject(
                ErrorHandler.sendCorrectError(res, ErrorCode.BadRequestError, ErrorMsg.Order_MissingOrderId),
            );
        } catch (e) {
            return ErrorHandler.sendCorrectError(
                res,
                ErrorCode.InternalServerError,
                ErrorMsg.General_InternalServerError,
            );
        }
    }
}
