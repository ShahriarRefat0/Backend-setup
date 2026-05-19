import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ApiResponse } from "../../utils/ApiResponse";
import { OrderService } from "./order.service";



const createOrder = catchAsync(async(req:Request, res: Response)=>{
const result = await OrderService.createOrder(req.body, req.user.id)
ApiResponse.success(res, "Order created successfully", result)
})

const getAllOrders = catchAsync(async(req: Request, res: Response)=>{
    const result = await OrderService.getAllOrders()
    ApiResponse.success(res, "Orders Fetched Successfully", result)
})

const confirmOrder = catchAsync(async(req: Request, res: Response)=>{
    const result = await OrderService.confirmOrder(req.params.id as string)
    ApiResponse.success(res, "Order Confirmed Successfully", result)
})

const cancleOrder = catchAsync(async(req: Request, res: Response)=>{
    const result = await OrderService.cancleOrder(req.params.id as string)
    ApiResponse.success(res, "Order Cancelled Successfully", result)
})


export const OrderController ={
    createOrder,
    getAllOrders,
    confirmOrder,
    cancleOrder
}