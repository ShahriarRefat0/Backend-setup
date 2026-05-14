// export type TApiResponse<T> = {
//     success: boolean;
//     message: string;
//     data: T;
// }


interface ErrorResponse {
    status: number;
    message: string;
    stack?: string;
    error?: string;
} 

export type {ErrorResponse}