import axios, { AxiosResponse } from 'axios';
import { AxiosConfig } from '../interfaces/axiosConfig';

/**
 * This file contains the main custom global axios request method which is the standard request method for the entire application.
 * The base url, it appends this string to each url property that was recieved from each request.
 */
const BASE_URL = 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api';

export function axiosRequest<T>(config: AxiosConfig<T>): Promise<AxiosResponse> {
    //const token = localStorage.getItem('JWT');
    return axios.request({
        method: config.method,
        timeout: 30000,
        baseURL: !config.noBase ? BASE_URL : '',
        url: config.url,
        data: config.body,
        responseType: config.responseType,
        // headers: {
        //     Authorization: token,
        //     ...(config.headers || {}),
        // },
        params: {
            ...config.params,
        },
    });
}