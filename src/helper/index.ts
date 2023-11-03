import { RequestHandler, Request, Response, NextFunction } from 'express';

import crypto from 'crypto';

import { StatusCodes } from 'http-status-codes';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { prisma } from '../configs/db';

import { ENV } from '../configs/envs';

import { BadRequestError } from '../errors/customErrors';

export class Utils {
  static async accountVerificationToken(id: number) {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(Date.now() + 30 * 60 * 1000);

    const admin = await prisma.admin.update({
      where: { id: id },
      data: {
        accountVerificationToken: verificationToken,
        accountVerificationTokenExpires: tokenExpiration,
      },
    });
    return admin;
  }

  static async generatePasswordResetToken(): Promise<string> {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    return resetToken;
  }

  static async generateToken(id: number): Promise<string> {
    if (!ENV.JWT.SECRET)
      throw new BadRequestError('JWT_KEY is required in environment');

    const token = jwt.sign({ id }, ENV.JWT.SECRET as string, {
      expiresIn: ENV.JWT.EXPIRES,
    });
    return token;
  }

  static async hashedPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch;
  }
}
