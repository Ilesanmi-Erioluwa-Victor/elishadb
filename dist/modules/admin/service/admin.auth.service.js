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
exports.adminSignup = void 0;
const admin_model_1 = require("../model/admin.model");
const helper_1 = require("../../../helper");
const customErrors_1 = require("../../../errors/customErrors");
const { comparePassword } = helper_1.Utils;
const { accountVerificationAdminM, accountVerificationUpdatedAdminM, createAdminM, findAdminEmailM, } = admin_model_1.adminQuery;
const adminSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield createAdminM(req.body);
    if (!admin)
        throw new customErrors_1.BadRequestError('something went wrong, try again');
    //   sendMail('admin', admin, req, res, next);
    res.json({
        message: 'you have successfully created your account, log in now',
        status: 'success',
    });
});
exports.adminSignup = adminSignup;
