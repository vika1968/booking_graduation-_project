"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_1 = require("joi-password");
const joiPassword = joi_1.default.extend(joi_password_1.joiPasswordExtendCore);
exports.UserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joiPassword
        .string()
        .min(6)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required()
});
