import { ProductEntity } from '../../entities/productEntity';
import { IProduct } from '../../models/product.model';

describe('Product Entity', () => {
    it('should have an getProducts method', () => {
        expect(ProductEntity.getProducts).toBeDefined();
    });

    it('should have a getProductByCategory method', () => {
        expect(ProductEntity.getProductByCategory).toBeDefined();
    });
    it('should have a getProductById method', () => {
        expect(ProductEntity.getProductById).toBeDefined();
    });
    it('should have a getProducts method', () => {
        expect(ProductEntity.getProducts).toBeDefined();
    });
    it('should have a getProducts method', () => {
        expect(ProductEntity.updateProduct).toBeDefined();
    });
    it('should have a deleteProduct method', () => {
        expect(ProductEntity.deleteProduct).toBeDefined();
    });
    it('should create a product using createProduct method', async () => {
        try {
            const result: IProduct = await ProductEntity.createProduct({
                name: 'iPhone',
                price: '645',
                category: 'phone',
            });
            expect(result).toEqual({
                id: 2,
                name: 'iPhone',
                price: '645',
                category: 'phone',
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('should return a list of products using getProducts', async () => {
        try {
            const result: IProduct[] = await ProductEntity.getProducts();
            expect(result[1]).toEqual({
                id: 2,
                name: 'iPhone',
                price: '645',
                category: 'phone',
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('should return the correct product using getProductById', async () => {
        try {
            const result: IProduct = await ProductEntity.getProductById(2);
            expect(result).toEqual({
                id: 2,
                name: 'iPhone',
                price: '645',
                category: 'phone',
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('should return the correct product using getProductByCategory', async () => {
        try {
            const result: IProduct[] = await ProductEntity.getProductByCategory('phone');
            expect(result).toEqual([
                {
                    id: 2,
                    name: 'iPhone',
                    price: '645',
                    category: 'phone',
                },
            ]);
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('should return the  product using updateProduct', async () => {
        try {
            const result: IProduct = await ProductEntity.updateProduct(
                {
                    name: 'samsung',
                    price: '1000',
                    category: 'phone',
                },
                2,
            );
            expect(result).toEqual({
                id: 2,
                name: 'samsung',
                price: '1000',
                category: 'phone',
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });

    it('should delete the correct product using deleteProduct', async () => {
        try {
            const result: IProduct = await ProductEntity.deleteProduct(2);
            expect(result).toEqual({
                id: 2,
                name: 'samsung',
                price: '1000',
                category: 'phone',
            });
        } catch (e) {
            throw new Error('the error is: ' + e);
        }
    });
});
