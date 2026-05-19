import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { UserRoute } from "../modules/user/user.route";
import { OrderRoute } from "../modules/order/order.route";
import { ProductRoute } from "../modules/product/product.route";

const routes: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
    {
    path: "/users",
    route: UserRoute,
  },
  {
  path: "/products",
  route: ProductRoute,
},
  {
   path: "/orders",
   route: OrderRoute,
}
];

moduleRoutes.forEach((item) => {
  routes.use(item.path, item.route);
});

export default routes;