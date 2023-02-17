import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Quote, RootState } from 'types'
import { gandalfProfile } from 'public'
import { useQuery } from 'react-query'
import { getQuote } from 'services'
import { useForm } from 'react-hook-form'
import { useDeleteQuote } from 'hooks'

export const useViewQuote = () => {
  const { locale, query, push } = useRouter()
  const { movie, stage, quote } = query
  const { t } = useTranslation()
  const { deleteQuoteAndRedirect } = useDeleteQuote()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')

  const [currentQuote, setCurrentQuote] = useState<Quote>({})

  const userInformation = useSelector((state: RootState) => state.userData)

  const form = useForm({
    defaultValues: {
      quote_en: '',
      quote_ka: '',
    },
    mode: 'all',
  })

  useQuery(['quote', quote], () => getQuote(quote as string), {
    onSuccess: (r) => {
      setCurrentQuote(r.data)
      if (Object.keys(r.data).length === 0) {
        push('/404')
      }
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

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
    quote,
    form,
    deleteQuoteOnClick,
  }
}
