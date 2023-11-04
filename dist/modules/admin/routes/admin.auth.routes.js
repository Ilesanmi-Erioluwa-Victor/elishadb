"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const auth_1 = require("../../../middlewares/auth");
const validationMiddleware_1 = require("../../../middlewares/validationMiddleware");
const admin_auth_service_1 = require("../service/admin.auth.service");
const { authenticateUser } = auth_1.Auth;
route.post('admin_sign_up', validationMiddleware_1.validateAdminSignupInput, admin_auth_service_1.adminSignup);
exports.default = route;
