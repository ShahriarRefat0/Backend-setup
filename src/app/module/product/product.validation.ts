import {z} from "zod";

export const createProductSchema ={
   title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description too short"),

  price: z
    .number()
    .positive("Price must be positive"),

  stock: z
    .number()
    .int()
    .nonnegative("Stock cannot be negative"),

  imageUrl: z
    .string("Invalid image URL"),
}

export type CreateProductInput = z.infer<typeof createProductSchema>