import { IOrder, OrderStatus } from '../models/order.model';
import { Database } from '../config/database';
import { DatabaseTables } from '../models/database.model';

export class OrderEntity {
    public static async getOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS} WHERE user_id=$1`;
            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all orders of user. Error: ${err}`);
        }
    }

    public static async getDeliveredOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            const status = OrderStatus.DELIVERED;
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS} WHERE user_id = ${userId} AND product_status = $1`;
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get active order. Error: ${err}`);
        }
    }

    public static async getRequestedOrdersByUserId(userId: number): Promise<IOrder[]> {
        try {
            const status = 'requested';
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS} WHERE user_id = ${userId} AND product_status = $1`;
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get completed orders. Error: ${err}`);
        }
    }

    public static async createOrder(order: IOrder): Promise<IOrder> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `INSERT INTO ${DatabaseTables.ORDERS} (product_id, quantity, user_id, product_status) VALUES($1, $2, $3, $4) RETURNING *`;
            const result = await conn.query(sql, [
                order.product_id,
                order.quantity,
                order.user_id,
                order.product_status,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create order. Error: ${err}`);
        }
    }

    public static async updateOrderStatus(status: OrderStatus, orderId: number): Promise<IOrder> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `UPDATE ${DatabaseTables.ORDERS} SET product_status=$1 WHERE id=$2 RETURNING *`;
            const result = await conn.query(sql, [status, orderId]);
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not update order status. Error: ${err}`);
        }
    }

    public static async deleteOrder(id: number): Promise<IOrder> {
        try {
            const sql = `DELETE FROM ${DatabaseTables.ORDERS} WHERE id=$1 RETURNING *`;
            const conn = await Database.getClientPool().connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
