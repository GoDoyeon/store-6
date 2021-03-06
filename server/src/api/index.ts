import { Router } from 'express';
import version from './routes/version';
import auth from './routes/auth';
import oauth from './routes/oauth';
import product from './routes/product';
import users from './routes/users';
import cart from './routes/cart';
import shipping from './routes/shipping';
import like from './routes/like';

export default () => {
  const router = Router();

  version(router);
  auth(router);
  oauth(router);
  product(router);
  users(router);
  cart(router);
  shipping(router);
  like(router);
  return router;
};
