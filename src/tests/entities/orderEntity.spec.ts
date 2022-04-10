import { IOrder, OrderStatus } from '../../models/order.model';
import { OrderEntity } from '../../entities/orderEntity';
import { UserEntity } from '../../entities/userEntity';
import { ProductEntity } from '../../entities/productEntity';

describe('Order Model', () => {
    it('should have an getOrdersByUserId  method', () => {
        expect(OrderEntity.getOrdersByUserId).toBeDefined();
    });
    it('should have a getDeliveredOrdersByUserId method', () => {
        expect(OrderEntity.getDeliveredOrdersByUserId).toBeDefined();
    });
    it('should have an getRequestedOrdersByUserId  method', () => {
        expect(OrderEntity.getRequestedOrdersByUserId).toBeDefined();
    });

    it('should have an updateOrderStatus  method', () => {
        expect(OrderEntity.updateOrderStatus).toBeDefined();
    });
    it('should have a deleteOrder method', () => {
        expect(OrderEntity.deleteOrder).toBeDefined();
    });
    it('should have a createOrder method', () => {
        expect(OrderEntity.createOrder).toBeDefined();
    });
    describe('handle Order', () => {
        beforeAll(async () => {
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
        });

        it('should create order using createOrder method', async () => {
            const result: IOrder = await OrderEntity.createOrder({
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });
            const result2: IOrder = await OrderEntity.createOrder({
                product_id: 1,
                quantity: 11,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });

            expect(result2).toEqual({
                id: 2,
                product_id: 1,
                quantity: 11,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });
        });

        it('should return order of user using getOrdersByUserId method', async () => {
            const result: IOrder[] = await OrderEntity.getOrdersByUserId(1);
            expect(result[0]).toEqual({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });
        });
        it('should return requested orders of user using getRequestedOrdersByUserId method', async () => {
            const result: IOrder[] = await OrderEntity.getRequestedOrdersByUserId(1);
            expect(result[0]).toEqual({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.REQUESTED,
            });
        });
        it('should return delivered orders of user using getDeliveredOrdersByUserId method', async () => {
            const result: IOrder[] = await OrderEntity.getDeliveredOrdersByUserId(1);
            expect(result).toEqual([]);
        });
        it('should update order status using updateOrderStatus method', async () => {
            const result: IOrder = await OrderEntity.updateOrderStatus(OrderStatus.DELIVERED, 1);
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.DELIVERED,
            });
        });
        it('should delete the selected order', async () => {
            const result: IOrder = await OrderEntity.deleteOrder(1);
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                product_status: OrderStatus.DELIVERED,
            });
        });
    });
});
