import type { Request, Response } from "express";

import { AuthService } from "./auth.service";
import catchAsync from "../../../utils/catchAsync";
import { ApiResponse } from "../../../utils/ApiResponse";


const register = catchAsync(async(req:Request, res: Response )=>{
const result = await AuthService.registerUser(req.body);

ApiResponse.success(res, "User registered successfully", result)
})


const login = catchAsync(async (req: Request, res:Response) =>{
    const result = await AuthService.loginUser(req.body);
    ApiResponse.success(res, "user logged in successfully", result)
})


const confirmEmail = catchAsync(async(req: Request, res: Response)=>{
    const token = req.query.token as string;
    const result = await AuthService.confirmEmail(token);
    ApiResponse.success(res, "Email confirmed successfully", result)
})

export const AuthController ={
    register,
    login,
  confirmEmail,
}