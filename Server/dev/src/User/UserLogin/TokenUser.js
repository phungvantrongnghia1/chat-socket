"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(user, process.env.SESCRET_KEY || "sescret", {
        algorithm: "HS256",
        expiresIn,
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=TokenUser.js.map