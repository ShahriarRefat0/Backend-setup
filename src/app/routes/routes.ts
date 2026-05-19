import { Router } from "express";

// import { UserRoute } from "../module/user/user.route.js";
import { AuthRoute } from "../module/auth/auth.route.js";
import { ProductRoute } from "../module/product/product.route.js";
import { OrderRoute } from "../module/order/order.route.js";

const routes: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/product",
    route: ProductRoute,
  },
  {
path: "/order",
route: OrderRoute
  }
];

moduleRoutes.forEach((route) =>
  routes.use(route.path, route.route)
);

export default routes;