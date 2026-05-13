import type { Request, Response } from "express";
import { UserService } from "./user.service";
import { success } from "zod";
// import { UserService } from "./user.service";


const createUser = async (req:Request, res: Response) =>{
 const result = await UserService.createUser("refat")
res.json({
    success: true,
    message: "user created successfully",
    data: result
})
}

export const UserController ={
    createUser,
}