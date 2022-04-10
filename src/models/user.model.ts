export interface IUser {
    id?: number;
    first_name?: string;
    last_name?: string;
    password: string;
    email: string;
    role: number;
}

export interface IUserLogin {
    password: string;
    email: string;
}

export interface IUserReturnedToken {
    token: string;
}

export enum UserRole {
    player = 1,
    admin = 2,
}
