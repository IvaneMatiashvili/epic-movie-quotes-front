import { SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const useLoginForm = () => {
  const { locale, push } = useRouter()

  const returnScrollbarAndCloseLoginForm = async (
    setHasScrollBar: SetState<boolean>
  ) => {
    setHasScrollBar(true)
    await push('/')
  }

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
    returnScrollbarAndCloseLoginForm,
    t,
    errors,
    isTypePassword,
    setIsTypePassword,
    handleSubmit: form.handleSubmit,
    form,
    locale,
  }
}
