import { CustomError } from "@/domain/errors/custom.error";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Axios {
    public static instance: Axios
    private readonly axiosInstance: AxiosInstance

    private constructor(
        baseUrl?: string,
        contentType?: string
    ) {
        this.axiosInstance = axios.create(
            {
                baseURL: baseUrl,
                headers: {
                    'Content-Type': contentType ?? 'application/x-www-form-urlencoded'
                }
            }
        )
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<any>) => {
                const data = response.data;
                
                if (data && typeof data === 'object' && 'exception' in data) {
                    const errorResponse = data;
                    throw CustomError.internalServer(
                        `${errorResponse.message} - ${errorResponse.debuginfo}`
                    );
                }
                return { ...response, data };
            },
            (error: AxiosError) => {                
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(baseUrl?:string, contentType?:string): Axios {
        this.instance = new Axios(baseUrl, contentType)
        return this.instance
    }

    public static createApplicationJsonInstance(baseUrl?:string): Axios {
        this.instance = new Axios(baseUrl, 'application/json')
        return this.instance
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config)
    }

    public async post<T>(url?:string ,data?: object, config?: AxiosRequestConfig): Promise<T> {
        return await this.axiosInstance.post(url ?? '', data, config)
    }
}
