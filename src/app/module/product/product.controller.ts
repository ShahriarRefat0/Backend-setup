import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import productService from "./product.service";
import { ApiResponse } from "../../utils/ApiResponse";




const createProduct = catchAsync(async (req:Request, res: Response)=>{
    const result = await productService.createProduct(req.body, req.user.id)

ApiResponse.success(res, "Product created successfully", result)
})

const getAllProducts = catchAsync(async(req: Request, res: Response)=> {
    const result = await productService.getAllProducts()

    ApiResponse.success(res, "Producsts Fetched Successfully", result)
})

const getSingleProduct  = catchAsync(async(req: Request, res: Response)=>{
    const result = await productService.getSingleProduct(req.params.id as string)

    ApiResponse.success(res, "Product Fetched Successfully", result)
}) 

const updateProduct = catchAsync(async(req: Request, res: Response)=>{
    const result = await productService.updateProduct(req.params.id as string, req.body)
    ApiResponse.success(res, "Product Updated Successfully", result)
})

const deleteProduct = catchAsync(async(req: Request, res: Response)=>{
const result = await productService.deleteProduct(req.params.id as string)
ApiResponse.success(res, "Product Deleted Successfully", result)
})



export const ProductController =  {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}