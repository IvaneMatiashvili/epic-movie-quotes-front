import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const useLandingPage = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const [hasScrollBar, setHasScrollBar] = useState(true)
  const [isRegisterOn, setIsRegisterOn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('registerOn') === 'true') {
      setHasScrollBar(false)
      setIsRegisterOn(true)
    }
  }, [])

  return {
    hasScrollBar,
    setHasScrollBar,
    isRegisterOn,
    setIsRegisterOn,
    locale,
    t,
  }
}
