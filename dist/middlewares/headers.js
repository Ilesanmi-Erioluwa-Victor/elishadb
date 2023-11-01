"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
const header = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Methods', 'GET, POST, PUT, DELETE , PATCH');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('content-type', 'application/json');
    next();
};
exports.header = header;
