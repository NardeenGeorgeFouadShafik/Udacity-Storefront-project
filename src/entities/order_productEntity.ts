import { IOrder_Product, OrderStatus } from '../models/order.model';
import { Database } from '../config/database';
import { DatabaseTables } from '../models/database.model';

export class Order_productEntity {
    public static async getOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS_PRODUCTS} JOIN ${DatabaseTables.ORDERS}
                            ON ${DatabaseTables.ORDERS_PRODUCTS + '.order_id'} = ${
                DatabaseTables.ORDERS + '.id'
            }  WHERE user_id=$1`;
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all orders of user. Error: ${err}`);
        }
    }

    public static async getDeliveredOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            const status = OrderStatus.DELIVERED;
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS_PRODUCTS} JOIN ${DatabaseTables.ORDERS}
                            ON ${DatabaseTables.ORDERS_PRODUCTS + '.order_id'} = ${
                DatabaseTables.ORDERS + '.id'
            } WHERE user_id = ${userId} AND product_status = $1`;
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get active order. Error: ${err}`);
        }
    }

    public static async getRequestedOrdersByUserId(userId: number): Promise<IOrder_Product[]> {
        try {
            const status = 'requested';
            const conn = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.ORDERS_PRODUCTS} JOIN ${DatabaseTables.ORDERS}
                            ON ${DatabaseTables.ORDERS_PRODUCTS + '.order_id'} = ${
                DatabaseTables.ORDERS + '.id'
            } WHERE user_id = ${userId} AND product_status = $1`;
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get completed orders. Error: ${err}`);
        }
    }

    public static async createOrder(order_product: IOrder_Product): Promise<IOrder_Product> {
        try {
            const conn = await Database.getClientPool().connect();
            const sqlOrder = `INSERT INTO ${DatabaseTables.ORDERS} (branch_order, date) VALUES($1, $2) RETURNING *`;
            const resultOrder = await conn.query(sqlOrder, [order_product.branch_order, new Date()]);
            const sql = `INSERT INTO ${DatabaseTables.ORDERS_PRODUCTS} (product_id, quantity, user_id, product_status, order_id) VALUES($1, $2, $3, $4, $5) RETURNING *`;
            const result = await conn.query(sql, [
                order_product.product_id,
                order_product.quantity,
                order_product.user_id,
                order_product.product_status,
                resultOrder.rows[0].id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create order. Error: ${err}`);
        }
    }

    public static async updateOrderStatus(status: OrderStatus, orderId: number): Promise<IOrder_Product> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `UPDATE ${DatabaseTables.ORDERS_PRODUCTS} SET product_status=$1 WHERE id=$2 RETURNING *`;
            const result = await conn.query(sql, [status, orderId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update order status. Error: ${err}`);
        }
    }

    public static async deleteOrder(id: number): Promise<IOrder_Product> {
        try {
            const sql = `DELETE FROM ${DatabaseTables.ORDERS_PRODUCTS} WHERE id=$1 RETURNING *`;
            const conn = await Database.getClientPool().connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
