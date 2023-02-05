import axios from './axios'

export const editUserInfo = async (data: object) => {
  return await axios.post('/api/edit-user-information', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getUserInfo = async () => {
  return await axios.get('/api/get-user-information')
}

export const createNewEmail = async (data: object) => {
  return await axios.post('/api/create-new-email', data)
}
