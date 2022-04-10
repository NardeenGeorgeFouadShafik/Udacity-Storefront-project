import { PoolClient, QueryResult } from 'pg';
import { IProduct } from '../models/product.model';
import { Database } from '../config/database';
import { DatabaseTables } from '../models/database.model';

export class ProductEntity {
    public static async getProducts(): Promise<IProduct[]> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.PRODUCTS}`;
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get  products. Error: ${err}`);
        }
    }

    public static async getProductById(productId: number): Promise<IProduct> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.PRODUCTS} WHERE id=$1`;
            const result: QueryResult = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get product by id. Error: ${err}`);
        }
    }

    public static async getProductByCategory(category: string): Promise<IProduct[]> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.PRODUCTS} WHERE category=$1`;
            const result: QueryResult = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get product by category. Error: ${err}`);
        }
    }

    public static async createProduct(product: IProduct): Promise<IProduct> {
        try {
            const sql = `INSERT INTO ${DatabaseTables.PRODUCTS} (name, price, category) VALUES($1, $2, $3) RETURNING *`;
            const conn: PoolClient = await Database.getClientPool().connect();
            const result: QueryResult = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create product. Error: ${err}`);
        }
    }

    public static async updateProduct(product: IProduct, productId: number): Promise<IProduct> {
        try {
            const conn = await Database.getClientPool().connect();
            const sql = `UPDATE ${DatabaseTables.PRODUCTS} SET name=$1, price=$2, category=$3  WHERE id=$4 RETURNING *`;
            const result = await conn.query(sql, [product.name, product.price, product.category, productId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update order status. Error: ${err}`);
        }
    }

    public static async deleteProduct(id: number): Promise<IProduct> {
        try {
            const sql = `DELETE FROM ${DatabaseTables.PRODUCTS} WHERE id=$1 RETURNING *`;
            const conn: PoolClient = await Database.getClientPool().connect();
            const result: QueryResult = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
