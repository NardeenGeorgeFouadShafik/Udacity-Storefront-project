export interface IOrder_Product {
    id?: number;
    product_id: number;
    quantity: number;
    user_id: number;
    product_status: string;
    order_id?: number;
    branch_order?: string;
    date?: Date;
}

export enum OrderStatus {
    REQUESTED = 'requested',
    IN_PROGRESS = 'inProgress',
    DELIVERED = 'delivered',
}

export enum OrderBranch {
    USA = 'USA',
    ALEXANDRIA = 'ALEXANDRIA',
    CAIRO = 'CAIRO',
}

export interface OrderParamsValidator {
    isStataValid: boolean;
    isUserExist: boolean;
    isProductExist: boolean;
    isBranchValid: boolean;
}
