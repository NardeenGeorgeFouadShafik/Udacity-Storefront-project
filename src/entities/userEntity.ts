import bcrypt from 'bcrypt';
import { JsonWebTokenHelper } from '../helpers/jsonWebToken';
import { IUser, IUserReturnedToken } from '../models/user.model';
import { PoolClient, QueryResult } from 'pg';
import { Database } from '../config/database';
import { DatabaseTables } from '../models/database.model';

export class UserEntity {
    public static pepper: string = process.env.BCRYPT_PASSWORD as string;
    public static salt: string = process.env.SALT_ROUNDS as string;

    public static async getUsers(): Promise<IUser[]> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.USERS}`;
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all users. Error: ${err}`);
        }
    }

    public static async getUserById(userId: number): Promise<IUser> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.USERS} WHERE id = $1`;
            const result: QueryResult = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user by id. Error: ${err}`);
        }
    }

    public static async getUserByEmail(email: string): Promise<IUser> {
        try {
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `SELECT * FROM ${DatabaseTables.USERS} WHERE email = $1`;
            const result: QueryResult = await conn.query(sql, [email]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user by id. Error: ${err}`);
        }
    }

    public static async createUser(user: IUser): Promise<IUserReturnedToken> {
        try {
            const hashPassword: string = bcrypt.hashSync(user.password + UserEntity.pepper, parseInt(UserEntity.salt));
            const conn: PoolClient = await Database.getClientPool().connect();
            const sql = `INSERT INTO ${DatabaseTables.USERS} (first_name, last_name, password, email, role) VALUES($1, $2, $3, $4, $5) RETURNING *`;
            const result: QueryResult = await conn.query(sql, [
                user.first_name,
                user.last_name,
                hashPassword,
                user.email,
                user.role,
            ]);
            conn.release();

            const id: number = result.rows[0].id;
            const token: string = JsonWebTokenHelper.generateJWT(id, result.rows[0].role);
            return {
                token,
            };
        } catch (err) {
            throw new Error(`Could not create user. Error: ${err}`);
        }
    }

    public static async updateUser(user: IUser, userId: number): Promise<IUser> {
        try {
            const hashPassword: string = bcrypt.hashSync(user.password + UserEntity.pepper, parseInt(UserEntity.salt));
            const conn = await Database.getClientPool().connect();
            const sql = `UPDATE ${DatabaseTables.USERS} SET first_name=$1, last_name=$2, email=$3, password=$4  WHERE id=$5 RETURNING *`;
            const result = await conn.query(sql, [user.first_name, user.last_name, user.email, hashPassword, userId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update order status. Error: ${err}`);
        }
    }

    public static async deleteUser(id: number): Promise<IUser> {
        try {
            const sql = `DELETE FROM ${DatabaseTables.USERS} WHERE id=$1 RETURNING *`;
            const conn: PoolClient = await Database.getClientPool().connect();
            const result: QueryResult = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
