import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export class Database {
    constructor() {}

    public static getClientPool(): Pool {
        return new Pool({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD as string,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT as string),
            database: process.env.ENV === 'dev' ? process.env.POSTGRES_DB : process.env.POSTGRES_DB_TEST,
            max: 20,
        });
    }
}
