import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "../types";



export const  globalErrorHandler = (err: any , _req: Request, res: Response, _next: NextFunction)=> {
    const statusCode = err.status || 500;
    const message = err.message || "Internal server error."

const errorResponse: ErrorResponse ={
    status: statusCode,
    message: message,
}

if (process.env.NODE_ENV === "development"){
    errorResponse.stack = err.stack;
    errorResponse.error = err.error;
}

res.status(statusCode).json(errorResponse);

}