import type { AxiosRequestConfig } from 'axios'
import Axios from './Axios'

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
}

const axiosUtil = new Axios(config)

export default axiosUtil
