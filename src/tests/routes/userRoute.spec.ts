import supertest from 'supertest';
import server from '../../server';
import { JsonWebTokenHelper } from '../../helpers/jsonWebToken';
import { ErrorMsg } from '../../models/apiResponse';

const token: string = JsonWebTokenHelper.generateJWT(1, 1);

describe('Test user endpoint responses', () => {
    it('gets all users api endpoint_Should return list of users', async () => {
        try {
            const res = await supertest(server).get('/api/user/list').set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body[0].id).toEqual(1);
            expect(res.body[0].first_name).toEqual('test');
            expect(res.body[0].last_name).toEqual('user');
            expect(res.body[1].id).toEqual(3);
            expect(res.body[1].first_name).toEqual('nardeen');
            expect(res.body[1].last_name).toEqual('george');
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('gets user by id api endpoint_ should return single user', async () => {
        try {
            const res = await supertest(server)
                .get('/api/user')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body.id).toEqual(1);
            expect(res.body.first_name).toEqual('test');
            expect(res.body.last_name).toEqual('user');
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('gets user by id api endpoint without token_ should return error', async () => {
        try {
            const res = await supertest(server).get('/api/user');
            expect(res.status).toBe(401);
            expect(res.body.message).toEqual(ErrorMsg.Auth_MissingToken);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('login user by email and password api endpoint _ should return token', async () => {
        try {
            const res = await supertest(server).get('/api/user/login?email=test11@gmail.com&password=password123');
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });
    it('login user by wrong email and password api endpoint _ should return error', async () => {
        try {
            const res = await supertest(server).get('/api/user/login?email=test211@gmail.com&password=password123');
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual(ErrorMsg.Auth_InvalidCredential);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('create user api endpoint_ should return user', async () => {
        try {
            const res = await supertest(server).post('/api/user').send({
                first_name: 'test',
                last_name: 'user',
                password: 'password123',
                email: 'test5@gmail.com',
                role: 1,
            });
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('create user api endpoint with existing email_ should return error', async () => {
        try {
            const res = await supertest(server).post('/api/user').send({
                first_name: 'test',
                last_name: 'user',
                password: 'password123',
                email: 'test5@gmail.com',
                role: 1,
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual(ErrorMsg.User_EmailIsAlreadyExist);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('update user api endpoint_ should return user', async () => {
        try {
            const res = await supertest(server).put('/api/user').set('Authorization', `Bearer ${token}`).send({
                first_name: 'test',
                last_name: 'user',
                password: 'password123',
                email: 'test05@gmail.com',
                role: 1,
            });

            expect(res.status).toBe(200);
            expect(res.body.id).toEqual(1);
            expect(res.body.first_name).toEqual('test');
            expect(res.body.last_name).toEqual('user');
            expect(res.body.email).toEqual('test05@gmail.com');
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('update user api endpoint_ should return user', async () => {
        try {
            const res = await supertest(server).put('/api/user').set('Authorization', `Bearer ${token}`).send({
                first_name: 'test',
                last_name: 'user',
                password: 'password123',
                email: 'test05@gmail.com',
                role: 1,
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toEqual(ErrorMsg.User_EmailIsAlreadyExist);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('deletes a user api endpoint', async () => {
        try {
            const res = await supertest(server)
                .delete('/api/user')
                .set('Authorization', 'Bearer ' + token);

            expect(res.status).toBe(200);
            expect(res.body.id).toEqual(1);
            expect(res.body.first_name).toEqual('test');
            expect(res.body.last_name).toEqual('user');
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('deletes a user api endpoint without token _ should return error', async () => {
        try {
            const res = await supertest(server).delete('/api/user').set('Authorization', '');
            expect(res.status).toBe(401);
            expect(res.body.message).toEqual(ErrorMsg.Auth_MissingToken);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });
});
