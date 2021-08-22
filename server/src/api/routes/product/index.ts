import { Router } from 'express';
import { handleGetProducts, handleGetProductDetail } from './productController';

const productRouter = Router();

export default (router: Router) => {
  router.use('/products', productRouter);

  productRouter.get('/', handleGetProducts);
  productRouter.get('/:id', handleGetProductDetail);

  return router;
};
