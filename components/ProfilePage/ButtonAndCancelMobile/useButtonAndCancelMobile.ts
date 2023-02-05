import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SetState } from 'types'

export const useButtonAndCancelMobile = (
  setIsSubmitFormOpen?: SetState<boolean>
) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const hideModal = () => {
    setIsSubmitFormOpen && setIsSubmitFormOpen(false)
  }

  return { locale, t, hideModal }
}
