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
