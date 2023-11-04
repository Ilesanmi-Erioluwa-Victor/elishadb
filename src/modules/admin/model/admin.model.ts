import { signupAdmin } from './../interfaces/admin.interface';
import { prisma } from '../../../configs/db';

import { Utils } from '../../../helper';

const { accountVerificationToken, generateToken, hashedPassword } = Utils;

export class adminQuery {
  static async findAdminIdM(id: number) {
    const adminId = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    return adminId;
  }

  static async findAdminEmailM(email: string) {
    const userEmail = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return userEmail;
  }

  static async createAdminM(admin: signupAdmin) {
    const { name, email, password } = admin;
    const createdAdmin = await prisma.admin.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: await hashedPassword(password),
      },
    });

    generateToken(createdAdmin?.id as number);
    const tokenAdmin = await accountVerificationToken(createdAdmin?.id);
    return tokenAdmin;
  }

  static async accountVerificationAdminM(
    id: number,
    accountVerificationToken: string,
    time: Date
  ) {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
        accountVerificationToken,
        accountVerificationTokenExpires: {
          gt: time,
        },
      },
    });

    return admin;
  }

  static async accountVerificationUpdatedAdminM(
    id: number,
    isAccountVerified: boolean,
    accountVerificationToken: string,
    accountVerificationTokenExpires: any
  ) {
    const admin = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        isAccountVerified,
        accountVerificationToken,
        accountVerificationTokenExpires,
      },
    });

    return admin;
  }
}
