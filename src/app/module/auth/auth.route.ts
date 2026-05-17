import { Router } from "express";
import validateRequest from "../../middleware/validateSchema";
import { loginValidationSchema, userValidationSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";



const router:Router = Router();

router.post("/register", validateRequest(userValidationSchema), AuthController.register)

router.post("/login", validateRequest(loginValidationSchema), AuthController.login)

router.get("/confirm-email", AuthController.confirmEmial)

export const AuthRoute = router;