import { body, param, validationResult } from 'express-validator';

import { Request, Response, NextFunction } from 'express';

import { prisma } from '../configs/db';

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors';

import { adminQuery } from '../modules/admin/model/admin.model';

const { findAdminEmailM } = adminQuery;

const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages: any = errors
          .array()
          .map((error: any) => `${error.path} : ${error.msg}`);

        // if (errorMessages[0].startsWith('no job')) {
        //   throw new NotFoundError(errorMessages);
        // }
        if (errorMessages[0].startsWith('not authorized')) {
          console.log('from Unauthorized', errorMessages);
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateAdminSignupInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const admin = await findAdminEmailM(email);
      if (admin) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password').notEmpty().withMessage('Password is required'),
]);
