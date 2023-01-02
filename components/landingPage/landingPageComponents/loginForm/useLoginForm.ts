import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const useLoginForm = () => {
  const { locale } = useRouter()

  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      mode: 'all',
    },
  })
  const { errors } = form.formState

  const [isTypePassword, setIsTypePassword] = useState(true)

  return {
    t,
    errors,
    isTypePassword,
    setIsTypePassword,
    handleSubmit: form.handleSubmit,
    form,
    locale,
  }
}
