/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/no-unused-vars

import axios, { AxiosInstance, AxiosResponse } from 'axios'

const apiUrl: string = import.meta.env.VITE_API_URL;
const appUrl: string = import.meta.env.VITE_APP_URL;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupApiClient(ctx: any = undefined): AxiosInstance {
    const api = axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000,
    })

    api.interceptors.request.use(
        async (config: any) => {
            const accessToken = await window.localStorage.getItem('@access_token')
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        },
        (error: any) => Promise.reject(error),
    )

    api.interceptors.response.use(
        (response: AxiosResponse) => {
            return response
        },
        async (error: any) => {
            const originalRequest = error.config

            if (error.response.status === 500) {
                alert('Servidor não encontrado')
            }

            const refreshToken = await window.localStorage.getItem('@refresh_token');

            if ((error.response.status === 401 || error.response.data.code == 'token.expired') && refreshToken && !originalRequest._retry) {
                originalRequest._retry = true

                return api
                    .post('/refresh-token', { refresh: refreshToken })
                    .then((res: AxiosResponse) => {
                        const { token } = res.data

                        originalRequest._retry = true
                        api.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        originalRequest.headers['Authorization'] = 'Bearer ' + token
                        return api(originalRequest)
                    })
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .catch((error: any) => {
                        window.localStorage.removeItem('@access_token');
                        window.localStorage.removeItem('@refresh_token');
                        window.location.replace(appUrl + "/");
                    })
            }

            return Promise.reject(error)
        },
    )

    return api
}
