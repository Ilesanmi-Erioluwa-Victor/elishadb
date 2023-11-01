"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const envs_1 = require("./configs/envs");
const headers_1 = require("./middlewares/headers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(headers_1.header);
envs_1.ENV.MODE.MODE === 'development' ? app.use((0, morgan_1.default)('dev')) : '';
exports.default = app;
