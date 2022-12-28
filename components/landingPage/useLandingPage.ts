import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TFunction } from 'i18next'
import { useTranslation } from 'next-i18next'

export const useLandingPage = () => {
  let t: TFunction<'translation', undefined>
  ;({ t } = useTranslation())
  const { locale }: { locale?: string | undefined } = useRouter()

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
