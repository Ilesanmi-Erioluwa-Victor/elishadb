"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._404 = void 0;
const customErrors_1 = require("./customErrors");
class _404 {
    static notFound(req, res, next) {
        throw new customErrors_1.NotFoundError(`Can't find ${req.originalUrl}, ensure you have the correct URL`);
    }
}
exports._404 = _404;
