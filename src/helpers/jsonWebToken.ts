import jwt from 'jsonwebtoken';

export class JsonWebTokenHelper {
    constructor() {}

    public static generateJWT(userId: number, userRole: number): string {
        return jwt.sign({ user_id: userId, user_role: userRole }, process.env.JWT_SECRET as string);
    }
}
