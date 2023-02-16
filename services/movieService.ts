import axios from './axios'

export const storeMovie = async (data: object) => {
  return await axios.post('/api/store-movie', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const editMovie = async (data: object) => {
  return await axios.post('/api/edit-movie', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const storeQuote = async (data: object) => {
  return await axios.post('/api/store-quote', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const editQuote = async (data: object) => {
  return await axios.post('/api/edit-quote', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const storeUserComment = async (data: object) => {
  return await axios.post('/api/store-comment', data)
}

export const getGenres = async () => {
  return await axios.get('/api/get-genres')
}

export const getMovies = async () => {
  return await axios.get('/api/get-movies')
}

export const getMovie = async (movie_id: string) => {
  return await axios.get(`/api/get-movie?movie_id=${movie_id}`)
}
export const deleteMovie = async (data: object) => {
  return await axios.post('/api/delete-movie', data)
}

export const searchMovies = async (data: object) => {
  return await axios.post('/api/search-movies', data)
}
export const getQuote = async (quote_id: string) => {
  return await axios.get(`/api/get-quote?quote_id=${quote_id}`)
}

export const deleteQuote = async (data: object) => {
  return await axios.post('/api/delete-quote', data)
}
