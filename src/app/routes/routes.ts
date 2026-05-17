import { Router } from "express";

// import { UserRoute } from "../module/user/user.route.js";
import { AuthRoute } from "../module/auth/auth.route.js";

const routes: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) =>
  routes.use(route.path, route.route)
);

export default routes;