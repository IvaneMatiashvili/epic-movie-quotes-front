import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export const useForgotPasswordForm = () => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      email: '',
      mode: 'all',
    },
  })
  const { errors } = form.formState

  const showFeedback = async () => {
    await push('?stage=passwordRecover')
  }

  return {
    t,
    errors,
    handleSubmit: form.handleSubmit,
    form,
    locale,
    showFeedback,
  }
}
