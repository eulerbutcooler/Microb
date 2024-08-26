import { object, string, z } from "zod";

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

export const createblogSchema = object({
  title: z.string(),
  content: z.string(),
});

export const updateblogSchema = object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type signupSchema = z.infer<typeof signupSchema>;
export type signinSchema = z.infer<typeof signinSchema>;
export type createblogSchema = z.infer<typeof createblogSchema>;
export type updateblogSchema = z.infer<typeof updateblogSchema>;
