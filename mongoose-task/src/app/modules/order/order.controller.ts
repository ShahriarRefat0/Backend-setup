
import type {
  Request,
  Response,
} from "express";
import catchAsync from "../../../utils/catchAsync";
import { ApiResponse } from "../../../utils/ApiResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.user.id;

    const result =
      await OrderService.createOrder(
        req.body,
        customerId
      );

    ApiResponse.success(
      res,
      "Order created successfully",
      result
    );
  }
);

const getMyOrders = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.user.id;

    const result =
      await OrderService.getMyOrders(
        customerId
      );

    ApiResponse.success(
      res,
      "Orders fetched successfully",
      result
    );
  }
);

const cancelOrder = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.user.id;

    const result =
      await OrderService.cancelOrder(
        req.params.id as any,
        customerId
      );

    ApiResponse.success(
      res,
      "Order cancelled successfully",
      result
    );
  }
);

const confirmOrder = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OrderService.confirmOrder(
        req.params.id as any
      );

    ApiResponse.success(
      res,
      "Order confirmed successfully",
      result
    );
  }
);

export const OrderController = {
  createOrder,
  getMyOrders,
  cancelOrder,
  confirmOrder,
};