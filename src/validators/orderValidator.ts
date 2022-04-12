import { IOrder_Product, OrderBranch, OrderParamsValidator, OrderStatus } from '../models/order.model';
import { Request, Response } from 'express';
import { ErrorCode, ErrorMsg, ErrorResponse } from '../models/apiResponse';

export class OrderValidator {
    constructor() {}

    public static validateOrder(req: Request, res: Response): IOrder_Product {
        return {
            product_id: req.body.product_id ? req.body.product_id : null,
            user_id: res.locals.userData.user_id ? res.locals.userData.user_id : null,
            quantity: req.body.quantity ? req.body.quantity : null,
            product_status: req.body.product_status ? req.body.product_status : null,
            order_id: req.body.order_id ? req.body.order_id : null,
            branch_order: req.body.branch_order ? req.body.branch_order : null,
            date: new Date(),
        };
    }

    public static returnOrderError(order: IOrder_Product): ErrorResponse {
        let errorMsg = '';
        if (!order.user_id) errorMsg += ErrorMsg.Order_MissingUserId + ' ';
        if (!order.product_id) errorMsg += ErrorMsg.Order_MissingProductId + ' ';
        if (!order.product_status) errorMsg += ErrorMsg.Order_MissingProductStatus + ' ';
        if (!order.quantity) errorMsg += ErrorMsg.Order_MissingQuantity + ' ';
        if (!order.branch_order) errorMsg += ErrorMsg.Order_MissingBranch + ' ';

        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }

    public static validateProductStatus(orderStatus: string): boolean {
        return [OrderStatus.REQUESTED, OrderStatus.DELIVERED, OrderStatus.IN_PROGRESS].includes(
            orderStatus as OrderStatus,
        );
    }

    public static validateProductBranch(orderBranch: string): boolean {
        return [OrderBranch.USA, OrderBranch.CAIRO, OrderBranch.ALEXANDRIA].includes(orderBranch as OrderBranch);
    }

    public static returnOrderParameterError(orderValidator: OrderParamsValidator): ErrorResponse {
        let errorMsg = '';
        if (!orderValidator.isStataValid) errorMsg += ErrorMsg.Order_InvalidProductStatus + ' ';
        if (!orderValidator.isProductExist) errorMsg += ErrorMsg.Order_ProductIdNotExist + ' ';
        if (!orderValidator.isUserExist) errorMsg += ErrorMsg.Order_UserIdNotExist + ' ';
        if (!orderValidator.isBranchValid) errorMsg += ErrorMsg.Order_InvalidBranch + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }
}
