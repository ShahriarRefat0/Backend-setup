
import { Order, OrderStatus } from "./order.model";

const createOrder = async (
  payload: any,
  customerId: string
) => {
  const order = await Order.create({
    customerId,
    productId: payload.productId,
    quantity: payload.quantity,
    totalPrice: payload.totalPrice,
  });

  return order;
};

const getMyOrders = async (
  customerId: string
) => {
  const orders = await Order.find({
    customerId,
  })
    .populate("productId")
    .populate("customerId");

  return orders;
};

const cancelOrder = async (
  orderId: string,
  customerId: string
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // only own order
  if (
    order.customerId.toString() !== customerId
  ) {
    throw new Error("Unauthorized");
  }

  // only pending order cancel
  if (
    order.status !== OrderStatus.PENDING
  ) {
    throw new Error(
      "Only pending orders can be cancelled"
    );
  }

  order.status = OrderStatus.CANCELLED;

  await order.save();

  return order;
};

const confirmOrder = async (
  orderId: string
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = OrderStatus.CONFIRMED;

  await order.save();

  return order;
};

export const OrderService = {
  createOrder,
  getMyOrders,
  cancelOrder,
  confirmOrder,
};