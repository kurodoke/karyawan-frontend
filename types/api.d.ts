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
    data: [
        {
            id: number;
            nama: string;
            gaji: number;
            jabatan: string;
            tanggal_masuk: Date;
        }
    ];
}
