import { z } from "zod";

export const userValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password is too long"),
});


export const loginValidationSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password is too long")
})



export type UserLogin = z.infer<typeof loginValidationSchema>;
export type UserRegister = z.infer<typeof userValidationSchema>;