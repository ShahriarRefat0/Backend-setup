import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.string().min(4).max(20),

    email: z.email("Invalid email address"),
  }),
});

export const UserValidation = {
  userSchema,
};