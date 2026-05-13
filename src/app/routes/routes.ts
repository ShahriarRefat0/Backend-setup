import { Router } from "express";

import { UserRoute } from "../module/user/user.route.js";

const routes: Router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
];

moduleRoutes.forEach((route) =>
  routes.use(route.path, route.route)
);

export default routes;