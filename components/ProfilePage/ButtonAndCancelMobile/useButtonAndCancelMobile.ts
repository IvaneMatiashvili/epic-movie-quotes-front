import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ButtonAndCancelMobile } from './types'

export const useButtonAndCancelMobile = ({
  setIsSubmitFormOpen,
}: ButtonAndCancelMobile) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const hideModal = () => {
    setIsSubmitFormOpen && setIsSubmitFormOpen(false)
  }

  return { locale, t, hideModal }
}
