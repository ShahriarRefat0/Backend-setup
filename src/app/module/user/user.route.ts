import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateSchema";
import { userSchema } from "./user.validation";


const router: Router = Router();

router.get("/create-user", validateRequest(userSchema),  UserController.createUser)


export const UserRoute = router;