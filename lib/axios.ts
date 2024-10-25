import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            if (config.headers)
                config.headers.Authorization = "Bearer " + token;
        }

        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
