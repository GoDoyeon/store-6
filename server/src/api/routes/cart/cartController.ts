import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import ErrorResponse from '@/utils/errorResponse';
import CartService from '@/service/cart';
import { commonError } from '@/constants/error';

export const handleGetCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartServiceInstance = Container.get(CartService);

    const cartItems = await cartServiceInstance.getCartItems(req.currentUser);

    return res.status(200).json(cartItems);
  } catch (e) {
    return next(e);
  }
};

export const handleDeleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartServiceInstance = Container.get(CartService);

    const cartIdx = Number(req.params.id);
    if (Number.isNaN(cartIdx) || cartIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const { amount } = await cartServiceInstance.deleteCartItem(
      cartIdx,
      req.currentUser,
    );

    return res.json({ amount });
  } catch (e) {
    return next(e);
  }
};

export const handleCartAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartServiceInstance = Container.get(CartService);

    const amount = await cartServiceInstance.getCartAmount(req.currentUser);
    return res.json({ amount });
  } catch (e) {
    return next(e);
  }
};
