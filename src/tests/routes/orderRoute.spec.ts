import supertest from 'supertest';
import server from '../../server';
import { JsonWebTokenHelper } from '../../helpers/jsonWebToken';
import { ErrorMsg } from '../../models/apiResponse';

const tokenAdmin: string = JsonWebTokenHelper.generateJWT(3, 2);
const tokenUser: string = JsonWebTokenHelper.generateJWT(1, 1);

describe('Test order endpoint responses', () => {
    it('gets all orders api endpoint by user_Should return list of orders', async () => {
        try {
            const res = await supertest(server).get('/api/order/list').set('Authorization', `Bearer ${tokenUser}`);
            expect(res.status).toBe(200);
            expect(res.body[0].product_status).toEqual('requested');
            expect(res.body[0].order_id).toEqual(2);
            expect(res.body[0].branch_order).toEqual('USA');
            expect(res.body[0].user_id).toEqual(1);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('gets all requested orders api endpoint by user _Should return list of orders', async () => {
        try {
            const res = await supertest(server).get('/api/order/requested').set('Authorization', `Bearer ${tokenUser}`);
            expect(res.status).toBe(200);
            expect(res.body[0].product_status).toEqual('requested');
            expect(res.body[0].order_id).toEqual(2);
            expect(res.body[0].branch_order).toEqual('USA');
            expect(res.body[0].user_id).toEqual(1);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('gets all delivered orders api endpoint by user _Should return list of orders', async () => {
        try {
            const res = await supertest(server).get('/api/order/delivered').set('Authorization', `Bearer ${tokenUser}`);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('create order api endpoint_ should return order', async () => {
        try {
            const res = await supertest(server).post('/api/order').set('Authorization', `Bearer ${tokenUser}`).send({
                product_id: 1,
                quantity: 11,
                product_status: 'requested',
                branch_order: 'USA',
            });
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 3,
                product_id: 1,
                quantity: 11,
                user_id: 1,
                product_status: 'requested',
                order_id: 3,
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('create order api endpoint missing param_ should return error', async () => {
        try {
            const res = await supertest(server).post('/api/order').set('Authorization', `Bearer ${tokenUser}`).send({
                product_id: 1,
                quantity: 11,
                branch_order: 'USA',
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual(ErrorMsg.Order_MissingProductStatus + ' ');
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('update order api endpoint in valid status should return error', async () => {
        const res = await supertest(server)
            .put('/api/order?orderId=3&status=wasDelivered')
            .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual(ErrorMsg.Order_InvalidProductStatus);
    });
    it('update order api endpoint should return order', async () => {
        try {
            const res = await supertest(server)
                .put('/api/order?orderId=3&status=delivered')
                .set('Authorization', `Bearer ${tokenAdmin}`);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 3,
                product_id: 1,
                quantity: 11,
                user_id: 1,
                product_status: 'delivered',
                order_id: 3,
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('deletes a order api endpoint by admin', async () => {
        try {
            const res = await supertest(server)
                .delete('/api/order/3')
                .set('Authorization', 'Bearer ' + tokenAdmin);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 3,
                product_id: 1,
                quantity: 11,
                user_id: 1,
                product_status: 'delivered',
                order_id: 3,
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('deletes a order api endpoint without token _ should return error', async () => {
        try {
            const res = await supertest(server).delete('/api/order/3').set('Authorization', `Bearer ${tokenUser}`);
            expect(res.status).toBe(401);
            expect(res.body.message).toEqual(ErrorMsg.General_InsufficientPermissions);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });
});
