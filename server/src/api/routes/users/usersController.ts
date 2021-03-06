import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import UsersService from '@/service/users';

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      password,
      type,
      email,
      phone,
      profile,
      privacyTermsAndConditions,
      serviceTermsAndConditions,
    } = req.body;
    const userServiceInstance = Container.get(UsersService);

    const { idx, createdAt, updatedAt } = await userServiceInstance.createUser({
      id,
      password,
      type,
      email,
      phone,
      privacyTermsAndConditions,
      serviceTermsAndConditions,
      profile: typeof profile === 'string' ? profile : undefined,
    });

    return res.json({ idx, createdAt, updatedAt });
  } catch (e) {
    return next(e);
  }
};

export const handleGetCurrentUser = async (req: Request, res: Response) => {
  return res.json(req.currentUser);
};

export const handleUpdateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, email, phone } = req.body;
    const userServiceInstance = Container.get(UsersService);

    const files = req.files as Express.MulterS3.File[];
    const uploadUrl = files[0]?.location;

    const { idx, createdAt, updatedAt } = await userServiceInstance.updateUser(
      req.currentUser.idx,
      {
        password,
        email,
        phone,
        profile: uploadUrl,
      },
    );

    return res.json({ idx, createdAt, updatedAt, profile: uploadUrl });
  } catch (e) {
    return next(e);
  }
};

export const handleDeleteCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userServiceInstance = Container.get(UsersService);

    await userServiceInstance.deleteUser(req.currentUser.idx);

    return res.end();
  } catch (e) {
    return next(e);
  }
};
