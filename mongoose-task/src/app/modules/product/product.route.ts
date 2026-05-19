import { Router } from "express";

import { ProductController } from "./product.controller";

import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { auth } from "../../middleware/atuh";
import validateRequest from "../../middleware/validateRequest";

const router: Router = Router();

router.post(
  "/create",
  auth(["CUSTOMER"]),
  validateRequest(createProductValidationSchema),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getSingleProduct);

router.patch(
  "/:id",
  auth(["MERCHANT"]),
  validateRequest(updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete("/:id", auth(["MERCHANT"]), ProductController.deleteProduct);

export const ProductRoute = router;
