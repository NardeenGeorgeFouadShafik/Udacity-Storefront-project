import { Router, Response, Request } from 'express';
import { ProductController } from '../../controllers/productController';
import { Authorization } from '../../middlewares/authorization';
import { UserRole } from '../../models/user.model';
import { Authentication } from '../../middlewares/authenication';

export const productRoute: Router = Router();

productRoute.get('/list', async (req: Request, res: Response) => {
    return await ProductController.getAllProducts(res);
});

productRoute.get('/:id', async (req: Request, res: Response) => {
    return await ProductController.getProductById(req, res);
});

productRoute.get('/category/:category', async (req: Request, res: Response) => {
    return await ProductController.getProductByaCategory(req, res);
});

productRoute.post(
    '/',
    [Authentication.validateAuthToken, Authorization.permit([UserRole.admin])],
    async (req: Request, res: Response) => {
        return await ProductController.createProduct(req, res);
    },
);

productRoute.put(
    '/:id',
    [Authentication.validateAuthToken, Authorization.permit([UserRole.admin])],
    async (req: Request, res: Response) => {
        return await ProductController.updateProduct(req, res);
    },
);

productRoute.delete(
    '/:id',
    [Authentication.validateAuthToken, Authorization.permit([UserRole.admin])],
    async (req: Request, res: Response) => {
        return await ProductController.deleteProductById(req, res);
    },
);
