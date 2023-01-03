import axios from 'axios'
import * as process from 'process'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOVIE_QUOTES_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  async (response) => {
    return response
  },

  async (error) => {
    const status = error?.response?.status

    if (status === 404) {
    } else if (status === 403) {
    } else if (status === 401) {
    }

    return Promise.reject(error)
  }
)

export default instance
