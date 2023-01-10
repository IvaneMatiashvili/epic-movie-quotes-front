import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const useTranslationAndLocale = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return {
    t,
    locale,
  }
}
