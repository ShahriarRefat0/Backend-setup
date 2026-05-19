import { Router } from "express";

import { loginValidationSchema, userValidationSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";



const router:Router = Router();

router.post("/register", validateRequest(userValidationSchema), AuthController.register)

router.post("/login", validateRequest(loginValidationSchema), AuthController.login)

router.get("/confirm-email", AuthController.confirmEmail)

export const AuthRoute = router;