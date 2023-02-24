import axios from './axios'
export const getQuotes = async (start: number) => {
  return await axios.get(`/api/get-quotes?start=${start}`)
}

export const getNotifications = async (start: number) => {
  return await axios.get(`/api/get-notifications?start=${start}`)
}
export const searchQuotes = async (data: object) => {
  return await axios.post('/api/search-quotes', data)
}

export const removeNotifications = async () => {
  return await axios.get('/api/remove-notifications')
}

export const removeNotification = async (data: object) => {
  return await axios.post('/api/remove-notification', data)
}

export const logOut = async (logout: boolean) => {
  return await axios.post('/api/logout', logout)
}
