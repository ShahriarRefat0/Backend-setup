import type { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const merchantId = req.user.id;

  const result = await ProductService.createProduct(req.body, merchantId);

  ApiResponse.success(res, "Product created successfully", result);
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  ApiResponse.success(res, "Products fetched successfully", result);
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getSingleProduct(req.params.id as any);

  ApiResponse.success(res, "Product fetched successfully", result);
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const merchantId = req.user.id;

  const result = await ProductService.updateProduct(
    req.params.id as any,
    req.body,
    merchantId,
  );

  ApiResponse.success(res, "Product updated successfully", result);
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const merchantId = req.user.id;

  const result = await ProductService.deleteProduct(
    req.params.id as any,
    merchantId,
  );

  ApiResponse.success(res, "Product deleted successfully", result);
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
