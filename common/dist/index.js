"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateblogSchema = exports.createblogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)()
        .min(8, { message: "minimum length must be 8" })
        .max(10, { message: "maximum length must be 20" })
        .refine((password) => /[A-Z]/.test(password), {
        message: "must contain atleast one uppercase letter",
    })
        .refine((password) => /[a-z]/.test(password), {
        message: "must contain atleast one lowercase letter",
    })
        .refine((password) => /[0-9]/.test(password)),
    username: (0, zod_1.string)(),
});
exports.signinSchema = (0, zod_1.object)({
    username: (0, zod_1.string)(),
    password: (0, zod_1.string)()
        .min(8, { message: "minimum length must be 8" })
        .max(10, { message: "maximum length must be 20" })
        .refine((password) => /[A-Z]/.test(password), {
        message: "must contain atleast one uppercase letter",
    })
        .refine((password) => /[a-z]/.test(password), {
        message: "must contain atleast one lowercase letter",
    })
        .refine((password) => /[0-9]/.test(password)),
});
exports.createblogSchema = (0, zod_1.object)({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateblogSchema = (0, zod_1.object)({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
});
