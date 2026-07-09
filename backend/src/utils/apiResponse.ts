export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    timestamp: string;
}

export function successResponse<T>(
    data: T,
    message = "Success"
): ApiResponse<T> {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
}

export function errorResponse(
    message: string
): ApiResponse<null> {
    return {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };
}