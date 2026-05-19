
import { z } from "zod";

export const createProductValidationSchema =
  z.object({
    title: z.string().min(2),

    description: z.string().min(5),

    price: z.number().min(1),

    stock: z.number().min(0),

    image: z.string().optional(),
  });

export const updateProductValidationSchema =
  z.object({
    title: z.string().optional(),

    description: z.string().optional(),

    price: z.number().optional(),

    stock: z.number().optional(),

    image: z.string().optional(),
  });