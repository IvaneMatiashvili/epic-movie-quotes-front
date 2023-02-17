import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from 'hooks'
import { useMutation, useQuery } from 'react-query'
import { getMovies, searchMovies } from 'services'
import { useForm } from 'react-hook-form'
import { FormObj } from 'types'
import { useDebouncedCallback } from 'use-debounce'

export const useMoviesPageMain = () => {
  const { locale, query } = useRouter()
  const { stage, edit } = query
  const { t } = useTranslation()

  useAuth()

  const { mutate: submitForm } = useMutation(searchMovies)

  const [isAddMoviesFormOpen, setIsAddMoviesFormOpen] = useState(false)
  const [moviesQuantity, setMoviesQuantity] = useState(0)
  const [movies, setMovies] = useState([])

  const inputReference = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'all',
  })

  useQuery('movies', getMovies, {
    onSuccess: async (response) => {
      setMoviesQuantity(response?.data?.length)
      setMovies(response?.data)
    },
    refetchOnWindowFocus: true,
    retry: 5,
    enabled: !stage,
  })

  const searchMovieOnChange = useDebouncedCallback((e) => {
    const data: FormObj = { search: e.target.value.trim() }
    submitForm(data, {
      onSuccess: async (response) => {
        setMovies(response.data)
        setMoviesQuantity(response?.data?.length)
      },
    })
  }, 400)

  useEffect(() => {
    if (stage === 'addMovie') {
      setIsAddMoviesFormOpen(true)
    } else {
      setIsAddMoviesFormOpen(false)
    }
  }, [stage, setIsAddMoviesFormOpen, isAddMoviesFormOpen])

  useEffect(() => {
    inputReference.current && inputReference.current.focus()
  }, [inputReference])

  useEffect(() => {
    if (!stage) {
      inputReference.current && inputReference.current.value.replaceAll('', '')
    }
  }, [stage, inputReference])

  return {
    locale,
    t,
    isAddMoviesFormOpen,
    stage,
    moviesQuantity,
    movies,
    form,
    register: form.register,
    handleSubmit: form.handleSubmit,
    searchMovieOnChange,
    inputReference,
    edit,
  }
}
