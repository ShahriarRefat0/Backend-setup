
import { Router } from "express";

import { OrderController } from "./order.controller";
import { createOrderValidationSchema } from "./order.validation";
import { auth } from "../../middleware/atuh";
import validateRequest from "../../middleware/validateRequest";


const router: Router = Router();

router.post(
  "/create",
  auth(["CUSTOMER"]),
  validateRequest(
    createOrderValidationSchema
  ),
  OrderController.createOrder
);

router.get(
  "/my-orders",
  auth(["CUSTOMER"] ),
  OrderController.getMyOrders
);

router.patch(
  "/cancel/:id",
  auth(["CUSTOMER"]),
  OrderController.cancelOrder
);

router.patch(
  "/confirm/:id",
  auth(["ADMIN"]),
  OrderController.confirmOrder
);

export const OrderRoute = router;