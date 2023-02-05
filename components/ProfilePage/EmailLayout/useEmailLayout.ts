import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { EmailLayoutProps } from './types'
import { useState } from 'react'

export const useEmailLayout = (emailLayoutProps: EmailLayoutProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const [isWarningOpen, setIsWarningHidden] = useState(false)

  const removeEmail = async () => {
    emailLayoutProps.setUserEmails(
      emailLayoutProps.userEmails.filter(
        (el) => el.email !== emailLayoutProps.email
      )
    )
    emailLayoutProps.setRemovedEmails((arr) => [...arr, emailLayoutProps.email])
    emailLayoutProps.setIsEditModeOn(true)
    emailLayoutProps.setIsSubmitFormOpen &&
      emailLayoutProps.setIsSubmitFormOpen(true)
  }

  const makeEmailPrimary = () => {
    emailLayoutProps.setPrimaryEmail(emailLayoutProps.email)
    emailLayoutProps.setValue('email', emailLayoutProps.email)
    emailLayoutProps.setIsEditModeOn(true)
    emailLayoutProps.setIsSubmitFormOpen &&
      emailLayoutProps.setIsSubmitFormOpen(true)
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
  }
}
