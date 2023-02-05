import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const useLandingPage = () => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()

  const { stage } = query

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
