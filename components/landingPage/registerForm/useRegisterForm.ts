import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createUser } from 'services'
import { FormObj } from 'types'
import { useMutation } from 'react-query'
import { useLoginWithGoogle } from 'hooks'
import { checkErrorMessage } from 'helpers'

export const useRegisterForm = () => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(createUser, {
    onSuccess: () => {
      push('?stage=checkYourEmail')
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      mode: 'all',
    },
  })
  const { errors, isValid } = form.formState
  const { setIsLoginWithGoogleClicked } = useLoginWithGoogle(
    form.setError,
    'register'
  )

  const watchPassword = useWatch({
    control: form.control,
    name: 'password',
  })
  const watchPasswordConfirmation = useWatch({
    control: form.control,
    name: 'confirm_password',
  })

  const loginWithGoogle = () => {
    setIsLoginWithGoogleClicked(true)
  }
  const [isTypePassword, setIsTypePassword] = useState(true)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true)

  useEffect(() => {
    if (watchPasswordConfirmation.length >= 8) {
      watchPassword === watchPasswordConfirmation
        ? form.clearErrors('confirm_password')
        : form.setError('confirm_password', {
            type: 'custom',
            message: t('errors:passwordConfirmation')!,
          })
    }
  }, [watchPassword, watchPasswordConfirmation, isValid, form, t])

  const showFeedback = async (data: FormObj) => {
    data['password_confirmation'] = data['confirm_password']
    data['locale'] = locale as string
    delete data['confirm_password']

    submitForm(data, {
      onError: (error: any) => {
        const setError = form.setError
        checkErrorMessage({
          setError,
          field: 'name',
          message: t('errors:nameExists'),
          error: error?.response?.data?.errors?.name,
        })
        checkErrorMessage({
          setError,
          field: 'email',
          message: t('errors:emailExists'),
          error: error?.response?.data?.errors?.email,
        })
      },
    })
  }

  return {
    t,
    errors,
    isTypePassword,
    setIsTypePassword,
    isTypeConfirmPassword,
    setIsTypeConfirmPassword,
    handleSubmit: form.handleSubmit,
    form,
    watchPassword,
    locale,
    showFeedback,
    loginWithGoogle,
  }
}
