import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { UseEmailLayout } from './types'
import { useState } from 'react'

export const useEmailLayout = ({
  setUserEmails,
  email,
  userEmails,
  setRemovedEmails,
  setValue,
  setIsEditModeOn,
  setPrimaryEmail,
  setIsSubmitFormOpen,
}: UseEmailLayout) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const [isWarningOpen, setIsWarningHidden] = useState(false)

  const removeEmail = async () => {
    setUserEmails(userEmails.filter((el) => el.email !== email))
    setRemovedEmails((arr) => [...arr, email])
    setIsEditModeOn(true)
    setIsSubmitFormOpen && setIsSubmitFormOpen(true)
  }

  const makeEmailPrimary = () => {
    setPrimaryEmail(email)
    setValue('email', email)
    setIsEditModeOn(true)
    setIsSubmitFormOpen && setIsSubmitFormOpen(true)
  }
  const showWarning = () => {
    setIsWarningHidden(true)
  }
  const hideWarning = () => {
    setIsWarningHidden(false)
  }

  return {
    locale,
    t,
    removeEmail,
    makeEmailPrimary,
    isWarningOpen,
    showWarning,
    hideWarning,
    setIsSubmitFormOpen,
  }
}
