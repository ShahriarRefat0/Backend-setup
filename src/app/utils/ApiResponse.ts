import type { Response } from "express";

const success = (res: Response, message: string, data: any, statusCode: number = 200) => {

    res.status(statusCode).json({
        success: true,
        message,
        data
    })
};

export const ApiResponse = {
    success,
}