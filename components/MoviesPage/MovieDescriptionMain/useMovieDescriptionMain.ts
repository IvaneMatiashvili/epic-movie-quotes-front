import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteMovie, getMovie } from 'services'
import { Movies } from 'types'
import { useState } from 'react'
import { useDeleteQuote } from 'hooks'

export const useMovieDescriptionMain = () => {
  const { locale, query, push } = useRouter()
  const { movie, stage, open, edit } = query
  const { t } = useTranslation()
  const [currentMovie, setCurrentMovie] = useState<Movies>({})
  const [quotes, setQuotes] = useState([])
  const { deleteQuoteAndRedirect } = useDeleteQuote()

  const queryClient = useQueryClient()
  const [openEditOrDelete, setOpenEditOrDelete] = useState<boolean[]>([])
  const [isSetBackground, setIsSetBackground] = useState(false)

  const [genres, setGenres] = useState([])

  const { mutate: deleteCurrentMovie } = useMutation(deleteMovie)

  useQuery(['movie', movie], () => getMovie(movie as string), {
    onSuccess: (response) => {
      setCurrentMovie(response?.data[0])
      setQuotes(response?.data[0]?.quotes)

      setGenres(response?.data[1])
      setOpenEditOrDelete(new Array(quotes.length).fill(false))
    },
    onError: () => {
      push('/404')
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const openDropdown = (idx: number) => {
    const newEdiTorDeleteArr = new Array(quotes.length).fill(false)
    newEdiTorDeleteArr[idx] = true
    setOpenEditOrDelete(newEdiTorDeleteArr)
    setIsSetBackground(true)
  }

  const closeDropdown = (idx: number) => {
    const newEdiTorDeleteArr = new Array(quotes.length).fill(false)
    newEdiTorDeleteArr[idx] = false
    setOpenEditOrDelete(newEdiTorDeleteArr)
    setIsSetBackground(false)
  }

  const changeTextLength = (text: string) => {
    if (text.length > 50) {
      return text.slice(0, 75) + '...'
    } else {
      return `${text}"`
    }
  }

  const deleteQuoteOnClick = (quoteId: string) => {
    deleteQuoteAndRedirect(quoteId)
  }
  const deleteMovieOnClick = () => {
    deleteCurrentMovie(
      { movie_id: movie },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries('movies')
          push(`/movies`)
        },
      }
    )
  }

  return {
    locale,
    t,
    currentMovie,
    genres,
    stage,
    quotes,
    changeTextLength,
    movie,
    open,
    closeDropdown,
    openDropdown,
    openEditOrDelete,
    isSetBackground,
    setIsSetBackground,
    edit,
    deleteMovieOnClick,
    deleteQuoteOnClick,
  }
}
