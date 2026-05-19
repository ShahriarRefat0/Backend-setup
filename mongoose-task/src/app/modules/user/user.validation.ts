import { z } from "zod";

export const updateUserValidationSchema =
  z.object({
    name: z.string().min(2).optional(),

    email: z.string().email().optional(),
  });