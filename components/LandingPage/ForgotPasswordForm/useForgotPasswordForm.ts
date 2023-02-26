import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { sendEmail } from 'services'
import { FormObj } from 'types'
import { checkErrorMessage } from 'helpers'

export const useForgotPasswordForm = () => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(sendEmail, {
    onSuccess: () => {
      push('?stage=passwordRecover')
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'all',
  })
  const { errors } = form.formState

  const showFeedback = async (data: FormObj) => {
    data['locale'] = locale as string
    submitForm(data, {
      onError: (error: any) => {
        if (error?.response?.data?.verify_email) {
          push('?stage=checkYourEmail')
        }

        checkErrorMessage({
          setError: form.setError,
          field: 'email',
          message: t('errors:emailValid'),
          error: error?.response?.data?.errors?.title_ka,
        })
      },
    })
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
