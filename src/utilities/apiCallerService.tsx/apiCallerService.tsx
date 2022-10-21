import axios, { AxiosRequestConfig } from "axios"
import devConfig from "../../config/devConfig"; 

export const get = (path: string, config?: AxiosRequestConfig) => {
    return axios.get(devConfig.hostUrl + path, config);
}

export const post = (path: string, data: any, config?: AxiosRequestConfig) => {
    return axios.post(devConfig.hostUrl + path, data, );
}