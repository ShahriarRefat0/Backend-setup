
import type { Request, Response } from "express";

import { UserService } from "./user.service";
import catchAsync from "../../../utils/catchAsync";
import { ApiResponse } from "../../../utils/ApiResponse";

const getAllUsers = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    ApiResponse.success(
      res,
      "Users fetched successfully",
      result
    );
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(
      req.params.id as any
    );

    ApiResponse.success(
      res,
      "User fetched successfully",
      result
    );
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(
      req.params.id as any
    );

    ApiResponse.success(
      res,
      "User deleted successfully",
      result
    );
  }
);

export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteUser,
};