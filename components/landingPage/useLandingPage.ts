import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const useLandingPage = () => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { stage } = query

  const [hasScrollBar, setHasScrollBar] = useState(true)

  useEffect(() => {
    if (stage === 'register' || stage === 'login') {
      setHasScrollBar(false)
    }
  }, [stage])

  return {
    hasScrollBar,
    setHasScrollBar,
    locale,
    t,
    stage,
  }
}
