import axios from "axios";
const url = import.meta.env.VITE_REST_API_URL
console.log(url)
const BaseService = axios.create({
    timeout: 60000,
    baseURL: url,
});
BaseService.interceptors.request.use(
    (config) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config.withCredentials= true
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        // const { response } = error;
        // This is for UnAuthorize Status
        return Promise.reject(error);
    }
);

export default BaseService;
