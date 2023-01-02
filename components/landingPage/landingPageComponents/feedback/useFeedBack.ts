import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const useFeedBack = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return {
    locale,
    t,
  }
}
