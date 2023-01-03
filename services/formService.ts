import axios from './axios'

export const createUser = (data: object) => {
  return axios.post('/register', data)
}
