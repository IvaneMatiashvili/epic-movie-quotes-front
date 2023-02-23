import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMutation, useQuery } from 'react-query'
import { getMovies, storeQuote } from 'services'
import React, { SetStateAction, useEffect, useState } from 'react'
import { FormObj, Movies, RootState, SetState } from 'types'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { gandalfProfile } from 'public'

export const useWriteNewPost = (
  setIsNewQuoteCreated: SetState<boolean>,
  closeWriteNewQuoteModal: () => {}
) => {
  const { locale } = useRouter()

  const { mutate: submitForm } = useMutation(storeQuote)
  const { t } = useTranslation()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')

  const [isUndefinedImageError, setUndefinedImageError] = useState(true)
  const [imageName, setImageName] = useState('')
  const [imageValue, setImageValue] = useState<string | Blob>('')
  const [movies, setMovies] = useState<Movies[]>([])
  const [isUndefinedMoviesError, setUndefinedMoviesError] = useState(true)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movies>({})
  const [hasBorder, setHasBorder] = useState(false)

  const userInformation = useSelector((state: RootState) => state.userData)

  const form = useForm({
    defaultValues: {
      quote_en: '',
      quote_ka: '',
      movie: '',
      image: '',
    },
    mode: 'all',
  })
  const { errors, isDirty, isSubmitting } = form.formState

  const getImageValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUndefinedImageError(false)

    if (e.target.files) {
      let imageValue = e?.target?.files[0]?.name
      if (imageValue?.length > 31) imageValue = imageValue?.slice(0, 31) + '...'
      setImageName(imageValue)
      setImageValue(e?.target?.files[0] as File)
    }
  }

  useQuery('movies', getMovies, {
    onSuccess: async (response) => {
      setMovies(response?.data)
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const storeNewQuote = (data: FormObj) => {
    const formData = new FormData()
    formData.append('quote_en', data['quote_en'])
    formData.append('quote_ka', data['quote_ka'])

    formData.append('movie_title_en', selectedMovie?.title?.en!)
    formData.append('movie_title_ka', selectedMovie?.title?.ka!)

    formData.append('movie_id', selectedMovie?.id!)

    formData.append('thumbnail', imageValue)

    submitForm(formData, {
      onSuccess: () => {
        setUndefinedMoviesError(true)
        setHasBorder(false)
        closeWriteNewQuoteModal()
        setIsNewQuoteCreated(true)
      },
    })
  }

  const openDropdown = async () => {
    setIsOpenDropdown(true)
    setUndefinedMoviesError(false)
    setHasBorder(true)
  }

  const closeDropdown = () => {
    setIsOpenDropdown(false)
  }

  const chooseMovie = (movie: SetStateAction<Movies>) => {
    setSelectedMovie(movie)
    setIsOpenDropdown(false)
    setUndefinedMoviesError(false)
  }

  useEffect(() => {
    if (!isUndefinedMoviesError) {
      if (Object.keys(selectedMovie).length < 1) {
        form.setValue('movie', '')
        form.trigger('movie')
      } else {
        form.setValue('movie', 'yes')
        form.clearErrors('movie')
      }
    }
  }, [selectedMovie, isUndefinedMoviesError, form])

  useEffect(() => {
    if (isSubmitting) {
      setHasBorder(true)
    }
  }, [isSubmitting, setHasBorder])

  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image)
      : setCurrentImageUrl(gandalfProfile.src)

    userInformation.name && setUserName(userInformation.name)
  }, [userInformation, isDirty])

  return {
    locale,
    t,
    currentUserImageUrl,
    userName,
    form,
    errors,
    register: form.register,
    getImageValue,
    imageName,
    isUndefinedImageError,
    storeNewQuote,
    handleSubmit: form.handleSubmit,
    openDropdown,
    closeDropdown,
    chooseMovie,
    isUndefinedMoviesError,
    isOpenDropdown,
    movies,
    selectedMovie,
    hasBorder,
  }
}
