import axios from 'axios'
import * as process from 'process'
import { getCookie } from 'cookies-next'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  async (config) => {
    if (!getCookie('XSRF-TOKEN')) {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URI}/sanctum/csrf-cookie`,
        {
          withCredentials: true,
        }
      )
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance
