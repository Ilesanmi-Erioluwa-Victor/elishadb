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
