import { Karyawan } from "./types";

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

export interface KaryawanResponse extends Omit<BaseResponse, "data"> {
    data: [Karyawan];
}

export interface SingleKaryawanResponse extends Omit<BaseResponse, "data"> {
    data: Karyawan;
}
