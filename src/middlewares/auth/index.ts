import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { BadRequestError } from '../../errors/customErrors';

import { ENV } from '../../configs/envs';

export class Auth {
  static authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.get('Authorization');

      if (!authHeader)
        throw new BadRequestError('Authorization token is required');

      let decode: any;

      const token = authHeader?.split(' ')[1];
      decode = jwt.verify(token as string, `${ENV.JWT.SECRET}`);

      if (!token || !decode) throw new BadRequestError('Invalid token');

      req.user = decode;

      next();
    } catch (error: any) {
      next(error);
    }
  };
}
