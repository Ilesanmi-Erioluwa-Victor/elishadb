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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("../../errors/customError");
class Auth {
}
exports.Auth = Auth;
_a = Auth;
Auth.authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader)
            throw new customError_1.BadRequestError('Authorization token is required');
        let decode;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        decode = jsonwebtoken_1.default.verify(token, `${ENV.JWT.SECRET}`);
        if (!token || !decode)
            throw new customError_1.BadRequestError('Invalid token');
        req.user = decode;
        next();
    }
    catch (error) {
        next(error);
    }
});
