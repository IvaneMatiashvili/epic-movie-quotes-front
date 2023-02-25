import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormObj, Movies, RootState } from 'types'
import { gandalfProfile } from 'public'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getMovie, storeQuote } from 'services'

export const useAddNewQuote = () => {
  const { locale, query, push } = useRouter()
  const { movie, stage } = query

  const { mutate: submitForm } = useMutation(storeQuote)
  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')

  const [isUndefinedImageError, setUndefinedImageError] = useState(true)
  const [imageName, setImageName] = useState('')
  const [imageValue, setImageValue] = useState<string | Blob>('')
  const [currentMovie, setCurrentMovie] = useState<Movies>({})
  const [genres, setGenres] = useState([])

  const textareaValidation = {
    required: t('errors:fieldIsRequired')!,
    minLength: {
      value: 10,
      message: t('errors:minTextarea'),
    },
    maxLength: {
      value: 600,
      message: t('errors:maxTextarea'),
    },
  }

  const userInformation = useSelector((state: RootState) => state.userData)

  const form = useForm({
    defaultValues: {
      quote_en: '',
      quote_ka: '',
      image: '',
    },
    mode: 'all',
  })
  const { errors, isDirty } = form.formState

  useQuery(['movie', movie], () => getMovie(movie as string), {
    onSuccess: async (response) => {
      setCurrentMovie(response?.data[0])

      setGenres(response?.data[1])
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const getImageValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUndefinedImageError(false)

    if (e.target.files) {
      let imageValue = e?.target?.files[0]?.name
      if (imageValue?.length > 31) imageValue = imageValue?.slice(0, 31) + '...'
      setImageName(imageValue)
      setImageValue(e?.target?.files[0] as File)
    }
  }

  const storeNewQuote = (data: FormObj) => {
    const formData = new FormData()
    formData.append('quote_en', data['quote_en'])
    formData.append('quote_ka', data['quote_ka'])
    formData.append('movie_title_en', currentMovie?.title?.en!)
    formData.append('movie_title_ka', currentMovie?.title?.ka!)
    formData.append('movie_id', movie as string)
    formData.append('thumbnail', imageValue)

    submitForm(formData, {
      onSuccess: async (response) => {
        await queryClient.invalidateQueries('movie')
        push(`/movies/${movie}/quote/${response?.data?.id}`)
      },
    })
  }

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
    currentMovie,
    genres,
    stage,
    movie,
    textareaValidation,
  }
}
