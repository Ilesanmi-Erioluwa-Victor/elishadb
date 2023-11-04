import { RequestHandler, NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { ENV } from '../../../configs/envs';

import { adminQuery } from '../model/admin.model';

import { Utils } from '../../../helper';

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../../errors/customErrors';

const { comparePassword } = Utils;

const {
  accountVerificationAdminM,
  accountVerificationUpdatedAdminM,
  createAdminM,
  findAdminEmailM,
} = adminQuery;

export const adminSignup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = await createAdminM(req.body);

  if (!admin) throw new BadRequestError('something went wrong, try again');

//   sendMail('admin', admin, req, res, next);
  res.json({
    message: 'you have successfully created your account, log in now',
    status: 'success',
  });
};
