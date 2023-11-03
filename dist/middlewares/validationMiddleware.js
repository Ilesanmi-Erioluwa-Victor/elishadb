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
exports.validateAdminSignupInput = void 0;
const express_validator_1 = require("express-validator");
const customErrors_1 = require("../errors/customErrors");
const admin_model_1 = require("../modules/admin/model/admin.model");
const { findAdminEmailM } = admin_model_1.adminQuery;
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors
                    .array()
                    .map((error) => `${error.path} : ${error.msg}`);
                // if (errorMessages[0].startsWith('no job')) {
                //   throw new NotFoundError(errorMessages);
                // }
                if (errorMessages[0].startsWith('not authorized')) {
                    console.log('from Unauthorized', errorMessages);
                    throw new customErrors_1.UnauthorizedError('not authorized to access this route');
                }
                throw new customErrors_1.BadRequestError(errorMessages);
            }
            next();
        },
    ];
};
exports.validateAdminSignupInput = withValidationErrors([
    (0, express_validator_1.body)('name').notEmpty().withMessage('name is required'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield findAdminEmailM(email);
        if (admin) {
            throw new customErrors_1.BadRequestError('email already exists');
        }
    })),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
]);
