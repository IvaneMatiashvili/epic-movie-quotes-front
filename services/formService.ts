import axios from './axios'
import { ResetPassword } from './types'

export const createUser = async (data: object) => {
  return await axios.post('/api/register/', data)
}

export const loginUserWithGoogle = async (stage: string, locale: string) => {
  return await axios.get(`/api/auth/google/${stage}/${locale}`)
}

export const loginUserWithGoogleCallback = async (
  query: string,
  stage: string,
  locale: string
) => {
  await axios.get('sanctum/csrf-cookie')
  return await axios.get(`/api/auth/google/${stage}/${locale}/callback${query}`)
}

export const loginUser = async (data: object) => {
  await axios.get('sanctum/csrf-cookie')
  return await axios.post('api/login', data, {
    withCredentials: true,
  })
}

export const verifyUser = async (url: string) => {
  return await axios.get(url)
}
export const sendEmail = async (data: object) => {
  return await axios.post('/api/forgot-password', data)
}

export const resetPassword = async ({ url, data }: ResetPassword) => {
  return await axios.post(url, data)
}
export const getPasswordResetForm = async (url: string) => {
  return await axios.get(url)
}
