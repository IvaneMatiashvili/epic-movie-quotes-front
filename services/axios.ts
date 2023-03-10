import axios from 'axios'
import * as process from 'process'
import { deleteCookie, getCookie } from 'cookies-next'

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
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response) => {
    return response
  },

  async (error) => {
    const status = error?.response?.status

    if (status === 401) {
      getCookie('userInfo') && deleteCookie('userInfo')
      getCookie('XSRF-TOKEN') && deleteCookie('XSRF-TOKEN')
      localStorage.removeItem('userInfo')
      window.location.href = '/403'
    }

    return Promise.reject(error)
  }
)
export default instance
