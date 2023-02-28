import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormObj, Genres, Movies, ReactDivMouseEvent, RootState } from 'types'
import { gandalfProfile } from 'public'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getGenres, getMovie, storeMovie, editMovie } from 'services'
import { checkErrorMessage } from 'helpers'

export const useAddNewMovie = () => {
  const { locale, query, push } = useRouter()
  const { edit, movie } = query
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(storeMovie)
  const { mutate: editForm } = useMutation(editMovie)

  const queryClient = useQueryClient()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [currentMovie, setCurrentMovie] = useState<Movies>({})

  const [genres, setGenres] = useState<Genres[]>([])
  const [genresIds, setGenresIds] = useState<number[]>([])
  const [selectedGenres, setSelectedGenres] = useState<Genres[]>([])
  const [isTypeText, setIsTypeText] = useState(true)
  const [datePlaceholder, setDatePlaceholder] = useState(
    t('movies:releaseDate')
  )
  const [isUndefinedError, setUndefinedError] = useState(true)
  const [isUndefinedImageError, setUndefinedImageError] = useState(true)
  const [isUndefinedGenresError, setUndefinedGenresError] = useState(true)
  const [imageName, setImageName] = useState('')
  const [imageValue, setImageValue] = useState<string | Blob>('')

  const [isFirstDateAttempt, setIsFirstDateAttempt] = useState(true)

  const userInformation = useSelector((state: RootState) => state.userData)

  const form = useForm({
    defaultValues: {
      name_en: '',
      name_ka: '',
      genres: '',
      director_en: '',
      director_ka: '',
      description_en: '',
      description_ka: '',
      release_date: '',
      budget: '',
      image: '',
    },
    mode: 'all',
  })
  const { errors } = form.formState

  const watchReleaseDate = useWatch({
    control: form.control,
    name: 'release_date',
  })

  useQuery('genres', getGenres, {
    onSuccess: async (response) => {
      setGenres(response?.data)
    },
  })

  useQuery(['movie', movie], () => getMovie(movie as string), {
    onSuccess: async (response) => {
      setCurrentMovie(response?.data[0])
      const genresArr: Genres[] = []
      response?.data[1]?.forEach((el: Genres) => genresArr.push(el.genre!))

      const genresIdsArr: number[] = []
      await response?.data[1]?.forEach((el: Genres) =>
        genresIdsArr.push(+el.id!)
      )

      if (genresArr.length > 0) {
        setSelectedGenres(genresArr)
        setGenresIds((prevState) => [...prevState, ...genresIdsArr])
      }

      const responseData = response?.data[0]

      if (edit) {
        form.setValue('name_en', responseData?.title?.en)
        form.setValue('name_ka', responseData?.title?.ka)
        form.setValue('director_en', responseData?.director.en)
        form.setValue('director_ka', responseData?.director.ka)
        form.setValue('description_en', responseData?.description.en)
        form.setValue('description_ka', responseData?.description.ka)
        form.setValue('budget', responseData?.budget)
        form.setValue('genres', 'yes')
      }
    },
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!edit,
  })

  const openDropdown = async () => {
    setIsOpenDropdown(true)
    setUndefinedGenresError(false)
  }

  const closeDropdown = () => {
    setIsOpenDropdown(false)
  }

  const chooseGenres = (genre: Genres) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres((prevState) => [...prevState, genre])
      setGenresIds((prevState) => [...prevState, genres.indexOf(genre) + 1])
    }
    setIsOpenDropdown(false)
  }

  const stopEventPropagation = (e: ReactDivMouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
  }

  const removeSelectedGenres = (genre: Genres) => {
    setUndefinedGenresError(false)
    setSelectedGenres(selectedGenres.filter((el) => el !== genre))

    if (edit) {
      let index = 0
      for (let i = 0; i < genres.length; i++) {
        if (genre.ka === genres[i].ka) index = i
      }
      setGenresIds(genresIds.filter((el) => el !== index + 1))
    } else {
      setGenresIds(genresIds.filter((el) => el !== genres.indexOf(genre)))
    }
  }

  const changeTextTypeOnBlur = () => {
    setIsTypeText(true)
  }

  const changeTextTypeOnFocus = async () => {
    setIsTypeText(false)
    await form.setFocus('release_date')
    await form.trigger('release_date')
    setUndefinedError(false)
    setIsFirstDateAttempt(false)
  }

  const checkDate: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (+new Date(e.target.value) < +new Date('1880-03-25')) {
      setIsTypeText(true)
      form.setError('release_date', {
        type: 'custom',
        message: t('errors:minDate')!,
      })
      setIsTypeText(false)
    } else if (+new Date(e.target.value) > +new Date()) {
      setIsTypeText(true)
      form.setError('release_date', {
        type: 'custom',
        message: t('errors:maxDate')!,
      })
      setIsTypeText(false)
    } else if (e.target.value.trim().length === 0) {
      form.setError('release_date', {
        type: 'required',
        message: t('errors:fieldIsRequired')!,
      })
    } else {
      form.clearErrors('release_date')
      form.setValue('release_date', e.target.value)
    }

    setDatePlaceholder(e.target.value)
  }

  const getImageValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      let imageValue = e?.target?.files[0]?.name
      if (imageValue?.length > 30) imageValue = imageValue?.slice(0, 30) + '...'
      setImageName(imageValue)
      setImageValue(e?.target?.files[0] as File)
    }

    setUndefinedImageError(false)
  }

  const storeNewMovie = (data: FormObj) => {
    const formData = new FormData()
    formData.append('name_en', data['name_en'])
    formData.append('name_ka', data['name_ka'])
    formData.append('genres_ids', JSON.stringify(genresIds))
    formData.append('director_en', data['director_en'])
    formData.append('director_ka', data['director_ka'])
    formData.append('description_en', data['description_en'])
    formData.append('description_ka', data['description_ka'])
    formData.append('release_date', data['release_date'])
    formData.append('budget', data['budget'])
    if (!edit) {
      formData.append('thumbnail', imageValue)
    } else {
      if (data['image'] !== currentMovie.thumbnail) {
        formData.append('thumbnail', imageValue)
      }
    }

    if (edit) {
      formData.append('movie_id', movie as string)
      editForm(formData, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('movie')
          push(`/movies/${movie}`)
        },
      })
    } else {
      submitForm(formData, {
        onSuccess: async (response) => {
          await queryClient.invalidateQueries('movies')
          push(`/movies/${response?.data?.id}`)
        },
        onError: async (error: any) => {
          checkErrorMessage({
            setError: form.setError,
            field: 'name_en',
            message: t('errors:movieNameExists'),
            error: error?.response?.data?.errors?.title_en,
          })
          checkErrorMessage({
            setError: form.setError,
            field: 'name_ka',
            message: t('errors:movieNameExists'),
            error: error?.response?.data?.errors?.title_ka,
          })
        },
      })
    }
  }

  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image)
      : setCurrentImageUrl(gandalfProfile.src)

    userInformation.name && setUserName(userInformation.name)
  }, [userInformation])

  useEffect(() => {
    if (watchReleaseDate?.length < 1) {
      setDatePlaceholder(t('movies:releaseDate'))
    } else {
      setDatePlaceholder(watchReleaseDate)
      setUndefinedError(false)
    }

    if (edit && isFirstDateAttempt) {
      form.setValue('release_date', currentMovie?.release_date!)
      setDatePlaceholder(currentMovie?.release_date!)
      setUndefinedError(true)
    }
  }, [
    watchReleaseDate,
    setDatePlaceholder,
    edit,
    form,
    currentMovie?.release_date,
    setIsFirstDateAttempt,
    isFirstDateAttempt,
    t,
  ])

  useEffect(() => {
    if (!isUndefinedGenresError) {
      if (selectedGenres.length < 1) {
        form.setValue('genres', '')
        form.trigger('genres')
      } else {
        form.setValue('genres', 'yes')
        form.clearErrors('genres')
      }
    }
  }, [selectedGenres, isUndefinedGenresError, form])

  useEffect(() => {
    if (!imageName) {
      setImageName(
        currentMovie?.thumbnail! &&
          ((currentMovie?.thumbnail.slice(0, 40) + '...') as string)
      )
      form.setValue('image', currentMovie?.thumbnail!)
    }
  }, [imageName, setImageName, currentMovie, form])

  return {
    locale,
    t,
    currentUserImageUrl,
    userName,
    form,
    errors,
    genres,
    isOpenDropdown,
    openDropdown,
    closeDropdown,
    chooseGenres,
    selectedGenres,
    removeSelectedGenres,
    stopEventPropagation,
    changeTextTypeOnBlur,
    changeTextTypeOnFocus,
    isTypeText,
    register: form.register,
    datePlaceholder,
    isUndefinedError,
    getImageValue,
    imageName,
    isUndefinedImageError,
    isUndefinedGenresError,
    checkDate,
    storeNewMovie,
    handleSubmit: form.handleSubmit,
    edit,
    currentMovie,
    movie,
  }
}
