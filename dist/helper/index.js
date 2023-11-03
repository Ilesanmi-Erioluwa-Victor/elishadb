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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../configs/db");
const envs_1 = require("../configs/envs");
const customErrors_1 = require("../errors/customErrors");
class Utils {
    static accountVerificationToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
            const tokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
            const admin = yield db_1.prisma.admin.update({
                where: { id: id },
                data: {
                    accountVerificationToken: verificationToken,
                    accountVerificationTokenExpires: tokenExpiration,
                },
            });
            return admin;
        });
    }
    static generatePasswordResetToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const resetToken = crypto_1.default.randomBytes(32).toString('hex');
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
            return resetToken;
        });
    }
    static generateToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!envs_1.ENV.JWT.SECRET)
                throw new customErrors_1.BadRequestError('JWT_KEY is required in environment');
            const token = jsonwebtoken_1.default.sign({ id }, envs_1.ENV.JWT.SECRET, {
                expiresIn: envs_1.ENV.JWT.EXPIRES,
            });
            return token;
        });
    }
    static hashedPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            return hashedPassword;
        });
    }
    static comparePassword(password, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcryptjs_1.default.compare(password, userPassword);
            return isMatch;
        });
    }
}
exports.Utils = Utils;
