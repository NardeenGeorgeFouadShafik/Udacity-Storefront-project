import { IUser, IUserReturnedToken } from '../../models/user.model';
import { UserEntity } from '../../entities/userEntity';

describe('User Entity', () => {
    it('should have a getUsers  method', () => {
        expect(UserEntity.getUsers).toBeDefined();
    });

    it('should have a getUserById method', () => {
        expect(UserEntity.getUserById).toBeDefined();
    });

    it('should have a createUser method', () => {
        expect(UserEntity.createUser).toBeDefined();
    });
    it('should have a deleteUser method', () => {
        expect(UserEntity.updateUser).toBeDefined();
    });
    it('should have a deleteUser method', () => {
        expect(UserEntity.getUserByEmail).toBeDefined();
    });
    it('should have a deleteUser method', () => {
        expect(UserEntity.deleteUser).toBeDefined();
    });

    it('should create a user using createUser method', async () => {
        const result: IUserReturnedToken = await UserEntity.createUser({
            first_name: 'nardeen',
            last_name: 'george',
            password: 'password@@!!',
            email: 'test@gmail.com',
            role: 1,
        });
        await UserEntity.createUser({
            first_name: 'nardeen',
            last_name: 'george',
            password: 'password@@!!',
            email: 'test22@gmail.com',
            role: 2,
        });
        await UserEntity.createUser({
            first_name: 'nardeen',
            last_name: 'george',
            password: 'password@@!!',
            email: 'test88@gmail.com',
            role: 1,
        });
        expect(result.token).toBeDefined();
    });
    it('should return all users using getUsers method', async () => {
        const result: IUser[] = await UserEntity.getUsers();
        expect(result).toHaveSize(4);
        expect(result[1].id).toEqual(2);
        expect(result[1].first_name).toEqual('nardeen');
        expect(result[1].last_name).toEqual('george');
        expect(result[1].password).not.toEqual('password@@!!');
    });

    it('should return the correct user using getUserById method', async () => {
        const id = 2;
        const result: IUser = await UserEntity.getUserById(id);
        expect(result.id).toEqual(id);
        expect(result.first_name).toEqual('nardeen');
        expect(result.last_name).toEqual('george');
    });

    it('should return the correct user using getUserById method', async () => {
        const id = 2;
        const result: IUser = await UserEntity.getUserByEmail('test@gmail.com');
        expect(result.id).toEqual(id);
        expect(result.first_name).toEqual('nardeen');
        expect(result.last_name).toEqual('george');
    });

    it('should create a user using updateUser method', async () => {
        const result: IUser = await UserEntity.updateUser(
            {
                first_name: 'evan',
                last_name: 'peter',
                password: 'password@@!!',
                email: 'test@gmail.com',
                role: 1,
            },
            2,
        );
        expect(result.first_name).toEqual('evan');
        expect(result.last_name).toEqual('peter');
    });

    it('should delete user using deleteUser method', async () => {
        const result: IUser = await UserEntity.deleteUser(2);
        expect(result.first_name).toEqual('evan');
        expect(result.last_name).toEqual('peter');
    });
});
