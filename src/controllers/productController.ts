import express from 'express';
import { ErrorHandler } from '../middlewares/errorHandler';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { ProductValidator } from '../validators/productValidator';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/productService';

export class ProductController {
    constructor() {}

    public static async getAllProducts(res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await ProductService.getAllProducts()));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async getProductById(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await ProductService.getProductById(parseInt(req.params.id))));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async getProductByaCategory(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const productCategory: string = req.params.category;
            if (productCategory) {
                return Promise.resolve(res.json(await ProductService.getProductByaCategory(productCategory)));
            }
            return Promise.reject(
                ErrorHandler.sendCorrectError(res, ErrorCode.BadRequestError, ErrorMsg.Product_MissingCategory),
            );
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async createProduct(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const product: IProduct = ProductValidator.validateProduct(req);
            return Promise.resolve(res.json(await ProductService.createProduct(product)));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async updateProduct(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const product: IProduct = ProductValidator.validateProduct(req);
            return Promise.resolve(res.json(await ProductService.updateProduct(parseInt(req.params.id), product)));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }

    public static async deleteProductById(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return Promise.resolve(res.json(await ProductService.deleteProductById(parseInt(req.params.id))));
        } catch (e: any) {
            return ErrorHandler.sendCorrectError(res, e.errorCode, e.errorMessage);
        }
    }
}
