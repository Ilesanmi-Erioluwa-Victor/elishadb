"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminQuery = void 0;
const db_1 = require("../../../configs/db");
const helper_1 = require("../../../helper");
const { accountVerificationToken, generateToken, hashedPassword } = helper_1.Utils;
class adminQuery {
    static findAdminIdM(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = yield db_1.prisma.admin.findUnique({
                where: {
                    id,
                },
            });
            return adminId;
        });
    }
    static findAdminEmailM(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = yield db_1.prisma.admin.findUnique({
                where: {
                    email,
                },
            });
            return userEmail;
        });
    }
    static createAdminM(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = admin;
            const createdAdmin = yield db_1.prisma.admin.create({
                data: {
                    name,
                    email: email.toLowerCase(),
                    password: yield hashedPassword(password),
                },
            });
            generateToken(createdAdmin === null || createdAdmin === void 0 ? void 0 : createdAdmin.id);
            const tokenAdmin = yield accountVerificationToken(createdAdmin === null || createdAdmin === void 0 ? void 0 : createdAdmin.id);
            return tokenAdmin;
        });
    }
    static accountVerificationAdminM(id, accountVerificationToken, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield db_1.prisma.admin.findUnique({
                where: {
                    id,
                    accountVerificationToken,
                    accountVerificationTokenExpires: {
                        gt: time,
                    },
                },
            });
            return admin;
        });
    }
    static accountVerificationUpdatedAdminM(id, isAccountVerified, accountVerificationToken, accountVerificationTokenExpires) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield db_1.prisma.admin.update({
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
        });
    }
}
exports.adminQuery = adminQuery;
