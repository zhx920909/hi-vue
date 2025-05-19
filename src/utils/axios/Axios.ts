import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type CreateAxiosDefaults,
} from 'axios'

class Axios {
    private instance: AxiosInstance

    private interceptorsRequest() {
        // Add a request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                // Do something before request is sent
                return config
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error)
            }
        )
    }

    private interceptorsResponse() {
        // Add a response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response
            },
            (error) => {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error)
            }
        )
    }

    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse
    }

    constructor(config: CreateAxiosDefaults) {
        this.instance = axios.create(config)
        this.interceptors()
    }

    public request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, rejects) => {
            this.instance
                .request<any, T>(config)
                .then((result) => resolve(result))
                .catch((error) => rejects(error))
        })
    }
}

export default Axios
