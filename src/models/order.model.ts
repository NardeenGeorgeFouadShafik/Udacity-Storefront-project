export interface IOrder {
    id?: number;
    product_id: number;
    quantity: number;
    user_id: number;
    product_status: string;
}

export enum OrderStatus {
    REQUESTED = 'requested',
    IN_PROGRESS = 'inProgress',
    DELIVERED = 'delivered',
}

export interface OrderParamsValidator {
    isStataValid: boolean;
    isUserExist: boolean;
    isProductExist: boolean;
}
