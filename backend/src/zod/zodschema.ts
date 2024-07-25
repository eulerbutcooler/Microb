import { object, string } from "zod";

export const signupSchema = object({
  email: string().email(),
  password: string()
    .min(8, { message: "minimum length must be 8" })
    .max(10, { message: "maximum length must be 20" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "must contain atleast one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "must contain atleast one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password)),
  username: string(),
});

export const signinSchema = object({
  username: string(),
  password: string()
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
