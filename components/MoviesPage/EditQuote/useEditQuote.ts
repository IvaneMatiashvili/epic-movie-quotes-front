import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormObj, Quote, RootState } from 'types'
import { gandalfProfile } from 'public'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { editQuote, getQuote } from 'services'
import { useForm } from 'react-hook-form'
import { useDeleteQuote } from 'hooks'

export const useEditQuote = () => {
  const { locale, query, push } = useRouter()
  const { movie, stage, quote } = query
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  const { deleteQuoteAndRedirect } = useDeleteQuote()

  const { mutate: editForm } = useMutation(editQuote)

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')

  const [currentQuote, setCurrentQuote] = useState<Quote>({})

  const [isUndefinedImageError, setUndefinedImageError] = useState(true)
  const [imageValue, setImageValue] = useState<string | Blob>('')

  const form = useForm({
    defaultValues: {
      quote_en: '',
      quote_ka: '',
      image: '',
    },
    mode: 'all',
  })

  const { errors } = form.formState

  const userInformation = useSelector((state: RootState) => state.userData)

  useQuery(['quote', quote], () => getQuote(quote as string), {
    onSuccess: (r) => {
      setCurrentQuote(r?.data)
      form.setValue('quote_en', r?.data.quote.en)
      form.setValue('quote_ka', r?.data.quote.ka)
    },
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const getImageValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setImageValue(e?.target?.files[0] as File)
    }
    setUndefinedImageError(false)
  }

  const storeNewQuote = (data: FormObj) => {
    const formData = new FormData()
    formData.append('quote_en', data['quote_en'])
    formData.append('quote_ka', data['quote_ka'])
    formData.append('quote_id', quote as string)
    data['image'] && formData.append('thumbnail', imageValue)

    editForm(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries('quote')

        push(
          stage === 'editQuoteFromDescription'
            ? `/movies/${movie}`
            : `/movies/${movie}/quote/${quote}`
        )
      },
    })
  }

  const deleteQuoteOnClick = () => {
    deleteQuoteAndRedirect(quote as string)
  }

  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image)
      : setCurrentImageUrl(gandalfProfile.src)

    userInformation.name && setUserName(userInformation.name)
  }, [userInformation])

  return {
    locale,
    t,
    currentUserImageUrl,
    userName,
    stage,
    movie,
    currentQuote,
    form,
    errors,
    register: form.register,
    getImageValue,
    isUndefinedImageError,
    storeNewQuote,
    handleSubmit: form.handleSubmit,
    imageValue,
    quote,
    deleteQuoteOnClick,
  }
}
