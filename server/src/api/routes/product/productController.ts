import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import ProductService from '@/service/product';
import { getTokenFromHeader } from '@/api/middlewares/isAuth';
import * as jwtHelper from '@/helper/jwt';
import ErrorResponse from '@/utils/errorResponse';
import { commonError } from '@/constants/error';
import CartService from '@/service/cart';

export const handleGetProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const querys = req.query;

    const products = await productServiceInstance.getProducts(querys);

    return res.status(200).json(products);
  } catch (e) {
    return next(e);
  }
};

export const handleGetProductDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const token = getTokenFromHeader(req);

    if (token) {
      let productDetailInfoResult;
      try {
        const decodedToken = jwtHelper.decodeAccessToken(token);

        productDetailInfoResult = await productServiceInstance.getProductDetail(
          productIdx,
          decodedToken.idx,
        );
      } catch {
        productDetailInfoResult = await productServiceInstance.getProductDetail(
          productIdx,
        );
      }
      res.json(productDetailInfoResult);
      return;
    }

    const productDetailInfo = await productServiceInstance.getProductDetail(
      productIdx,
    );
    res.json(productDetailInfo);
  } catch (e) {
    next(e);
  }
};

export const handleAddView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const data = await productServiceInstance.addView(
      productIdx,
      req.currentUser.idx,
    );

    res.json({
      idx: data?.idx,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    });
  } catch (e) {
    next(e);
  }
};

export const handleAddLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const { idx, createdAt, updatedAt } = await productServiceInstance.addLike(
      productIdx,
      req.currentUser.idx,
    );
    res.json({ idx, createdAt, updatedAt });
  } catch (e) {
    next(e);
  }
};

export const handleAddCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartServiceInstance = Container.get(CartService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const { idx, createdAt, updatedAt, amount } =
      await cartServiceInstance.addCartItem(productIdx, req.currentUser);
    res.json({ idx, createdAt, updatedAt, amount });
  } catch (e) {
    next(e);
  }
};

export const handleRemoveCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    const { amount } = await productServiceInstance.removeCart(
      productIdx,
      req.currentUser.idx,
    );

    res.json({ amount });
  } catch (e) {
    next(e);
  }
};

export const handleRemoveLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const productIdx = Number(req.params.id);
    if (Number.isNaN(productIdx) || productIdx <= 0) {
      throw new ErrorResponse(commonError.invalidPathParams);
    }

    await productServiceInstance.removeLike(productIdx, req.currentUser.idx);

    res.end();
  } catch (e) {
    next(e);
  }
};

export const handleAddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productServiceInstance = Container.get(ProductService);

    const {
      category,
      title,
      thumbnail,
      originPrice,
      discountedPrice,
      rank,
      images,
      mandatoryInfo,
      shipInfo,
    } = req.body;

    const { idx, updatedAt, createdAt } =
      await productServiceInstance.addProduct(
        category,
        title,
        thumbnail,
        originPrice,
        discountedPrice,
        rank,
        images,
        mandatoryInfo,
        shipInfo,
      );

    res.json({ idx, updatedAt, createdAt });
  } catch (e) {
    next(e);
  }
};
