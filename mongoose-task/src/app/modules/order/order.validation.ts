
import { z } from "zod";

export const createOrderValidationSchema =
  z.object({
    productId: z.string(),

    quantity: z.number().min(1),

    totalPrice: z.number().min(1),
  });