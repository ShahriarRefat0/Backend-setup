import { Router } from "express";

import { UserController } from "./user.controller";

const router: Router = Router();

router.get(
  "/",
  UserController.getAllUsers
);

router.get(
  "/:id",
  UserController.getSingleUser
);

router.delete(
  "/:id",
  UserController.deleteUser
);

export const UserRoute = router;