import supertest from 'supertest';
import server from '../../server';
import { JsonWebTokenHelper } from '../../helpers/jsonWebToken';
import { ErrorMsg } from '../../models/apiResponse';

const token: string = JsonWebTokenHelper.generateJWT(3, 2);

describe('Test Product endpoint responses', () => {
    it('gets all products api endpoint_Should return list of products', async () => {
        const res = await supertest(server).get('/api/product/list');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                name: 'handMadeRing',
                price: '645',
                category: 'accessories',
            },
        ]);
    });
    it('gets product by id api endpoint_ should return single product', async () => {
        const res = await supertest(server).get('/api/product/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            name: 'handMadeRing',
            price: '645',
            category: 'accessories',
        });
    });
    it('gets product by not exist id api endpoint', async () => {
        const res = await supertest(server).get('/api/product/5');
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual(ErrorMsg.Product_NotExist);
    });

    it('gets product by not exist category api endpoint', async () => {
        const res = await supertest(server).get('/api/product/category/test');
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual(ErrorMsg.Product_NotExist);
    });

    it('gets product by category api endpoint', async () => {
        const res = await supertest(server).get('/api/product/category/accessories');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                name: 'handMadeRing',
                price: '645',
                category: 'accessories',
            },
        ]);
    });
    it('create product api endpoint_ should return product', async () => {
        const res = await supertest(server)
            .post('/api/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iphone', price: '3000', category: 'phone' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 3,
            name: 'iphone',
            price: '3000',
            category: 'phone',
        });
    });
    it('create product api endpoint_Missing param_ should return error', async () => {
        const res = await supertest(server)
            .post('/api/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iphone', category: 'phone' });

        expect(res.status).toBe(400);
        expect(res.body.message).toEqual(ErrorMsg.Product_MissingPrice + ' ');
    });

    it('update product api endpoint_ should return product', async () => {
        const res = await supertest(server)
            .put('/api/product/3')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iphone', price: '4000', category: 'phone' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 3,
            name: 'iphone',
            price: '4000',
            category: 'phone',
        });
    });

    it('deletes a product api endpoint', async () => {
        const res = await supertest(server)
            .delete('/api/product/3')
            .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 3,
            name: 'iphone',
            price: '4000',
            category: 'phone',
        });
    });

    it('deletes a product api endpoint without token _ should return error', async () => {
        const res = await supertest(server).delete('/api/product/3').set('Authorization', '');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(ErrorMsg.Auth_MissingToken);
    });
});
