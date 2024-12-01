"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const secretKey = keys_1.configKeys.SECRET_KEY;
const authenticate = (req, res, next) => {
    var _a;
    console.log('req.header', req.header('Authorization'));
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    console.log('token', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log('user', user);
        req.user = { user };
        next();
    });
};
exports.authenticate = authenticate;
