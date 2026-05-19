import type { NextFunction, Request, Response } from "express";
import env from "../../config/env";
import jwt from "jsonwebtoken";

export const auth = (roles: string[])=>{
    return(req: Request, res: Response, next: NextFunction) =>{
try {
    // const token = req.headers.authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new Error("NO token provided");
    }
    const verifiedUser = jwt.verify(token, env.jwt_secret.toString()) as any;
} catch (error) {
    throw new Error("Invalid token");
}
    }
}