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

interface AuthUser {
    id: string;
    role: "MERCHANT" | "ADMIN" | "CUSTOMER";
    email: string;
}

export type {AuthUser}