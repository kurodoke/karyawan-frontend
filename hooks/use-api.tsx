import { api } from "@/lib/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type HTTPRequestMethod = "post" | "put" | "delete" | "get";

interface useApiRequestOptions<T> {
    method: HTTPRequestMethod;
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
    fullfiledCallback?: (res: AxiosResponse<T>) => void;
    errorCallback?: (err: AxiosError) => void;
    disableAutoNavigate?: boolean;
}

export function useApiRequest<T>({
    url,
    method,
    data,
    config,
    fullfiledCallback,
    errorCallback,
    disableAutoNavigate = false,
}: useApiRequestOptions<T>) {
    const [responseData, setResponseData] = useState<T>();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!data && (method === "post" || method === "put")) {
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<T> = await api.request({
                    method: method,
                    url: url,
                    data: data,
                    ...config,
                });
                setResponseData(response.data);
                if (fullfiledCallback) fullfiledCallback(response);
            } catch (err) {
                const error = err as AxiosError;

                setError(true);
                if (!disableAutoNavigate)
                    if (
                        error.response?.status === 401 ||
                        error.response?.status === 403
                    ) {
                        router.push("/login");
                    }

                if (errorCallback) errorCallback(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [method, url, data]);
    return { responseData, error, loading };
}
