import express, { Router } from 'express';
import { productRoute } from './api/productRoute';
import { UserRoute } from './api/userRoute';
import { OrderRoute } from './api/orderRoute';

const routes: Router = express.Router();

routes.use('/product', productRoute);
routes.use('/user', UserRoute);
routes.use('/order', OrderRoute);

export default routes;
