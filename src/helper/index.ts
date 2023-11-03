import { RequestHandler, Request, Response, NextFunction } from 'express';

import crypto from 'crypto';

import { StatusCodes } from 'http-status-codes';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { prisma } from '../configs/db';

import { ENV } from '../configs/envs';

import { BadRequestError } from '../errors/customErrors';
