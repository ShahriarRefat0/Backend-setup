import { Router } from "express";
import { auth } from "../../middleware/auth";
import { OrderController } from "./order.controller";

const route: Router = Router();

route.post("/create", auth(["CUSTOMER"]), OrderController.createOrder);
route.get("/all-orders", auth(["CUSTOMER"]), OrderController.getAllOrders);
route.put("/confirm/:id", auth(["CUSTOMER"]), OrderController.confirmOrder);
route.put("/cancel/:id", auth(["CUSTOMER"]), OrderController.cancleOrder);

export const OrderRoute = route;
