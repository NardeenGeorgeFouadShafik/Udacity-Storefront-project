import { ProductEntity } from '../entities/productEntity';
import { ErrorCode, ErrorMsg } from '../models/apiResponse';
import { IProduct } from '../models/product.model';
import { ProductValidator } from '../validators/productValidator';

export class ProductService {
    constructor() {}

    public static async getAllProducts(): Promise<IProduct[]> {
        try {
            return Promise.resolve(await ProductEntity.getProducts());
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getProductById(productId: number): Promise<IProduct> {
        try {
            if (productId) {
                const product = await ProductEntity.getProductById(productId);
                if (product) {
                    return product;
                }
                return Promise.reject({
                    errorCode: ErrorCode.BadRequestError,
                    errorMessage: ErrorMsg.Product_NotExist,
                });
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Product_MissingId,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async getProductByaCategory(productCategory: string): Promise<IProduct[]> {
        try {
            if (productCategory) {
                const products: IProduct[] = await ProductEntity.getProductByCategory(productCategory);
                if (products.length > 0) return Promise.resolve(products);
                return Promise.reject({
                    errorCode: ErrorCode.BadRequestError,
                    errorMessage: ErrorMsg.Product_NotExist,
                });
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Product_MissingCategory,
            });
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async createProduct(product: IProduct): Promise<IProduct> {
        try {
            if (!product.price || !product.name || !product.category) {
                return Promise.reject(ProductValidator.returnProductError(product));
            }
            return Promise.resolve(await ProductEntity.createProduct(product));
        } catch (e) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async updateProduct(productId: number, product: IProduct): Promise<IProduct> {
        try {
            if (productId) {
                if (!product.price || !product.name || !product.category) {
                    return Promise.reject(ProductValidator.returnProductError(product));
                }
                return Promise.resolve(await ProductEntity.updateProduct(product, productId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Product_MissingId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }

    public static async deleteProductById(productId: number): Promise<IProduct> {
        try {
            if (productId) {
                return Promise.resolve(await ProductEntity.deleteProduct(productId));
            }
            return Promise.reject({
                errorCode: ErrorCode.BadRequestError,
                errorMessage: ErrorMsg.Product_MissingId,
            });
        } catch (e: any) {
            return Promise.reject({
                errorCode: ErrorCode.InternalServerError,
                errorMessage: ErrorMsg.General_InternalServerError,
            });
        }
    }
}
