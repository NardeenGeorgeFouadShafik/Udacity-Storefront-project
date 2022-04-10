import { IOrder, OrderParamsValidator, OrderStatus } from '../models/order.model';
import { Request, Response } from 'express';
import { ErrorCode, ErrorMsg, ErrorResponse } from '../models/apiResponse';

export class OrderValidator {
    constructor() {}

    public static validateOrder(req: Request, res: Response): IOrder {
        return {
            product_id: req.body.product_id ? req.body.product_id : null,
            user_id: res.locals.userData.user_id ? res.locals.userData.user_id : null,
            quantity: req.body.quantity ? req.body.quantity : null,
            product_status: req.body.product_status ? req.body.product_status : null,
        };
    }

    public static returnOrderError(order: IOrder): ErrorResponse {
        let errorMsg = '';
        if (!order.user_id) errorMsg += ErrorMsg.Order_MissingUserId + ' ';
        if (!order.product_id) errorMsg += ErrorMsg.Order_MissingProductId + ' ';
        if (!order.product_status) errorMsg += ErrorMsg.Order_MissingProductStatus + ' ';
        if (!order.quantity) errorMsg += ErrorMsg.Order_MissingQuantity + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }

    public static validateProductStatus(orderStatus: string): boolean {
        return [OrderStatus.REQUESTED, OrderStatus.DELIVERED, OrderStatus.IN_PROGRESS].includes(
            orderStatus as OrderStatus,
        );
    }

    public static returnOrderParameterError(orderValidator: OrderParamsValidator): ErrorResponse {
        let errorMsg = '';
        if (!orderValidator.isStataValid) errorMsg += ErrorMsg.Order_InvalidProductStatus + ' ';
        if (!orderValidator.isProductExist) errorMsg += ErrorMsg.Order_ProductIdNotExist + ' ';
        if (!orderValidator.isUserExist) errorMsg += ErrorMsg.Order_UserIdNotExist + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }
}
