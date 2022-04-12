import { Order_productEntity } from '../entities/order_productEntity';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { IOrder_Product, OrderParamsValidator, OrderStatus } from '../models/order.model';
import { OrderValidator } from '../validators/orderValidator';
import { UserValidator } from '../validators/userValidator';
import { ProductValidator } from '../validators/productValidator';

export class OrderService {
    constructor() {}

    public static async getOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            if (userId) {
                return Promise.resolve(await Order_productEntity.getOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getDeliveredOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            if (userId) {
                return Promise.resolve(await Order_productEntity.getDeliveredOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getRequestedOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            if (userId) {
                return Promise.resolve(await Order_productEntity.getRequestedOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async createOrder(order: IOrder_Product): Promise<IOrder_Product> {
        try {
            if (
                !order.product_id ||
                !order.user_id ||
                !order.product_status ||
                !order.quantity ||
                !order.branch_order
            ) {
                return Promise.reject(OrderValidator.returnOrderError(order));
            }
            const orderParamsValidator: OrderParamsValidator = {
                isStataValid: OrderValidator.validateProductStatus(order.product_status),
                isUserExist: await UserValidator.isUserExist(order.user_id),
                isProductExist: await ProductValidator.isProductExist(order.product_id),
                isBranchValid: OrderValidator.validateProductBranch(order.branch_order),
            };
            if (
                !orderParamsValidator.isStataValid ||
                !orderParamsValidator.isUserExist ||
                !orderParamsValidator.isProductExist ||
                !orderParamsValidator.isBranchValid
            ) {
                return Promise.reject(OrderValidator.returnOrderParameterError(orderParamsValidator));
            }
            return Promise.resolve(await Order_productEntity.createOrder(order));
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async updateOrderStatus(orderId: number, orderStatus: string | null): Promise<IOrder_Product> {
        try {
            if (orderId) {
                const status = orderStatus ? (orderStatus as string) : null;
                if (status && OrderValidator.validateProductStatus(status)) {
                    return Promise.resolve(
                        await Order_productEntity.updateOrderStatus(orderStatus as OrderStatus, orderId),
                    );
                }
                return Promise.reject({
                    errorCode: ErrorCode.BadRequestError,
                    errorMessage: ErrorMsg.Order_InvalidProductStatus,
                });
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingOrderId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async deleteOrderById(orderId: number): Promise<IOrder_Product> {
        try {
            if (orderId) {
                return Promise.resolve(await Order_productEntity.deleteOrder(orderId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingOrderId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError + 'the error is: ' + e.message,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }
}
