interface BaseResponse {
    success: boolean;
    message: string;
    data: object;
    error_code?: number;
}

export interface LoginResponse extends Omit<BaseResponse, "data"> {
    data: {
        token: string;
    };
}
