import { z } from "zod";

export const createOrderSchema = z.object({
  totalPrice: z
    .number()
    .positive("Total price must be positive"),

  productId: z
    .string()
    .uuid("Invalid product id")
    .optional(),

  orderItems: z
    .array(
      z.object({
        productId: z
          .string()
          .uuid("Invalid product id"),

        quantity: z
          .number()
          .int()
          .positive("Quantity must be at least 1"),

        price: z
          .number()
          .positive("Price must be positive"),
      })
    )
    .min(1, "At least one order item is required"),
});

export const updateOrderSchema = z.object({
  totalPrice: z
    .number()
    .positive("Total price must be positive")
    .optional(),

  status: z
    .enum([
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ])
    .optional(),
});

export type CreateOrderInput =
  z.infer<typeof createOrderSchema>;

export type UpdateOrderInput =
  z.infer<typeof updateOrderSchema>;