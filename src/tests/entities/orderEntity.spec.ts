import { IOrder_Product, OrderStatus } from '../../models/order.model';
import { Order_productEntity } from '../../entities/order_productEntity';
import { UserEntity } from '../../entities/userEntity';
import { ProductEntity } from '../../entities/productEntity';

describe('Order Model', () => {
    it('should have an getOrdersByUserId  method', () => {
        expect(Order_productEntity.getOrdersByUserId).toBeDefined();
    });
    it('should have a getDeliveredOrdersByUserId method', () => {
        expect(Order_productEntity.getDeliveredOrdersByUserId).toBeDefined();
    });
    it('should have an getRequestedOrdersByUserId  method', () => {
        expect(Order_productEntity.getRequestedOrdersByUserId).toBeDefined();
    });

    it('should have an updateOrderStatus  method', () => {
        expect(Order_productEntity.updateOrderStatus).toBeDefined();
    });
    it('should have a deleteOrder method', () => {
        expect(Order_productEntity.deleteOrder).toBeDefined();
    });
    it('should have a createOrder method', () => {
        expect(Order_productEntity.createOrder).toBeDefined();
    });
    describe('handle Order', () => {
        beforeAll(async () => {
            try {
                await UserEntity.createUser({
                    first_name: 'test',
                    last_name: 'user',
                    password: 'password123',
                    email: 'test11@gmail.com',
                    role: 1,
                });
                await ProductEntity.createProduct({
                    name: 'handMadeRing',
                    price: '645',
                    category: 'accessories',
                });
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should create order using createOrder method', async () => {
            try {
                const result: IOrder_Product = await Order_productEntity.createOrder({
                    product_id: 1,
                    quantity: 10,
                    user_id: 1,
                    product_status: OrderStatus.REQUESTED,
                    branch_order: 'USA',
                });
                const result2: IOrder_Product = await Order_productEntity.createOrder({
                    product_id: 1,
                    quantity: 11,
                    user_id: 1,
                    product_status: OrderStatus.REQUESTED,
                    branch_order: 'USA',
                });
                expect(result).toEqual({
                    id: 1,
                    product_id: 1,
                    quantity: 10,
                    user_id: 1,
                    product_status: OrderStatus.REQUESTED,
                    order_id: 1,
                });

                expect(result2).toEqual({
                    id: 2,
                    product_id: 1,
                    quantity: 11,
                    user_id: 1,
                    product_status: OrderStatus.REQUESTED,
                    order_id: 2,
                });
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should return order of user using getOrdersByUserId method', async () => {
            try {
                const result: IOrder_Product[] = await Order_productEntity.getOrdersByUserId(1);
                expect(result[0].product_status).toEqual('requested');
                expect(result[0].order_id).toEqual(1);
                expect(result[0].branch_order).toEqual('USA');
                expect(result[0].user_id).toEqual(1);
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should return requested orders of user using getRequestedOrdersByUserId method', async () => {
            try {
                const result: IOrder_Product[] = await Order_productEntity.getRequestedOrdersByUserId(1);
                expect(result[0].product_status).toEqual('requested');
                expect(result[0].order_id).toEqual(1);
                expect(result[0].branch_order).toEqual('USA');
                expect(result[0].user_id).toEqual(1);
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should return delivered orders of user using getDeliveredOrdersByUserId method', async () => {
            try {
                const result: IOrder_Product[] = await Order_productEntity.getDeliveredOrdersByUserId(1);
                expect(result).toEqual([]);
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should update order status using updateOrderStatus method', async () => {
            try {
                const result: IOrder_Product = await Order_productEntity.updateOrderStatus(OrderStatus.DELIVERED, 1);
                expect(result).toEqual({
                    id: 1,
                    product_id: 1,
                    quantity: 10,
                    user_id: 1,
                    product_status: OrderStatus.DELIVERED,
                    order_id: 1,
                });
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });

        it('should delete the selected order', async () => {
            try {
                const result: IOrder_Product = await Order_productEntity.deleteOrder(1);
                expect(result).toEqual({
                    id: 1,
                    product_id: 1,
                    quantity: 10,
                    user_id: 1,
                    product_status: OrderStatus.DELIVERED,
                    order_id: 1,
                });
            } catch (e) {
                throw new Error('the error is: ' + e);
            }
        });
    });
});
