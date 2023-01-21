import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useQuery } from 'react-query'
import { verifyUser } from 'services'

export const useLandingPage = () => {
  const { t } = useTranslation()
  const { locale, query, push } = useRouter()

  const { stage, feedback, signature, paramId } = query

  useQuery(
    ['verifyUser', `${feedback}&paramId=${paramId}&signature=${signature}`],
    () => verifyUser(`${feedback}&paramId=${paramId}&signature=${signature}`),
    {
      onError: () => {
        push('/404')
      },
      enabled: !!feedback && !!signature && !!paramId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  const stageArr = useMemo(
    () => [
      'register',
      'login',
      'checkYourEmail',
      'emailActivated',
      'forgotPassword',
      'passwordRecover',
      'passwordReset',
      'passwordChanged',
    ],
    []
  )

  const [hasScrollBar, setHasScrollBar] = useState(true)

  useEffect(() => {
    stageArr.forEach((el) => {
      if (el === stage) {
        setHasScrollBar(false)
      }
    })
  }, [stage, stageArr])

  return {
    hasScrollBar,
    setHasScrollBar,
    locale,
    t,
    stage,
  }
}
