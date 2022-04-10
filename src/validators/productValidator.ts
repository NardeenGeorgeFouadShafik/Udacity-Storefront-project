import { IProduct } from '../models/product.model';
import { Request } from 'express';
import { ErrorCode, ErrorMsg, ErrorResponse } from '../models/apiResponse';
import { ProductEntity } from '../entities/productEntity';

export class ProductValidator {
    constructor() {}

    public static validateProduct(req: Request): IProduct {
        return {
            name: req.body.name ? req.body.name : null,
            price: req.body.price ? req.body.price : null,
            category: req.body.category ? req.body.category : null,
        };
    }

    public static returnProductError(product: IProduct): ErrorResponse {
        let errorMsg = '';
        if (!product.price) errorMsg += ErrorMsg.Product_MissingPrice + ' ';
        if (!product.name) errorMsg += ErrorMsg.Product_MissingName + ' ';
        if (!product.category) errorMsg += ErrorMsg.Product_MissingCategory + ' ';
        return { errorCode: ErrorCode.BadRequestError, errorMessage: errorMsg };
    }

    public static async isProductExist(id: number): Promise<boolean> {
        try {
            const product = await ProductEntity.getProductById(id);
            return Promise.resolve(!!product);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
