import { OrderEntity } from '../entities/orderEntity';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { IOrder, OrderParamsValidator, OrderStatus } from '../models/order.model';
import { OrderValidator } from '../validators/orderValidator';
import { UserValidator } from '../validators/userValidator';
import { ProductValidator } from '../validators/productValidator';

export class OrderService {
    constructor() {}

    public static async getOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            if (userId) {
                return Promise.resolve(await OrderEntity.getOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getDeliveredOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            if (userId) {
                return Promise.resolve(await OrderEntity.getDeliveredOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getRequestedOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            if (userId) {
                return Promise.resolve(await OrderEntity.getRequestedOrdersByUserId(userId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingUserId,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async createOrder(order: IOrder): Promise<IOrder> {
        try {
            if (!order.product_id || !order.user_id || !order.product_status || !order.quantity) {
                return Promise.reject(OrderValidator.returnOrderError(order));
            }
            const orderParamsValidator: OrderParamsValidator = {
                isStataValid: OrderValidator.validateProductStatus(order.product_status),
                isUserExist: await UserValidator.isUserExist(order.user_id),
                isProductExist: await ProductValidator.isProductExist(order.product_id),
            };
            if (
                !orderParamsValidator.isStataValid ||
                !orderParamsValidator.isUserExist ||
                !orderParamsValidator.isProductExist
            ) {
                return Promise.reject(OrderValidator.returnOrderParameterError(orderParamsValidator));
            }
            return Promise.resolve(await OrderEntity.createOrder(order));
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async updateOrderStatus(orderId: number, orderStatus: string | null): Promise<IOrder> {
        try {
            if (orderId) {
                const status = orderStatus ? (orderStatus as string) : null;
                if (status && OrderValidator.validateProductStatus(status)) {
                    return Promise.resolve(await OrderEntity.updateOrderStatus(orderStatus as OrderStatus, orderId));
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
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async deleteOrderById(orderId: number): Promise<IOrder> {
        try {
            if (orderId) {
                return Promise.resolve(await OrderEntity.deleteOrder(orderId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Order_MissingOrderId,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }
}
