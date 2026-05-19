import type { NextFunction, Request, Response } from "express";
import env from "../../config/env";
import jwt from "jsonwebtoken";

export const auth = (roles: string[]) =>{
    return (req: Request, res: Response, next: NextFunction)=>{
        
        try {
            // const token = req.headers.authorization;
             const token = req.headers.authorization?.split(" ")[1]; //requestly er jonno

        if (!token) {
            throw new Error("No token provided");
        }

        const verifiedUser = jwt.verify(
            token,
            env.jwt_secret
        ) as any;

//         console.log(verifiedUser);
// console.log(verifiedUser.role);
// console.log(roles);

        req.user = verifiedUser;

        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new Error(" Forbidden");
            
        }
        next();
        } catch (err) {
            next(err);
        }
       
    }
}