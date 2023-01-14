import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { loginUser } from 'services'
import { FormObj } from 'types'
import { useLoginWithGoogle } from 'hooks'
import { checkErrorMessage } from 'helpers'
import { setCookie } from 'cookies-next'

export const useLoginForm = () => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(loginUser)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember_me: '',
      mode: 'all',
    },
  })
  const { errors } = form.formState

  const { setIsLoginWithGoogleClicked } = useLoginWithGoogle(
    form.setError,
    'login'
  )

  const [isTypePassword, setIsTypePassword] = useState(true)

  const loginWithGoogle = () => {
    setIsLoginWithGoogleClicked(true)
  }

  const showFeedback = (data: FormObj) => {
    data['name'] = data['email']
    delete data['email']

    submitForm(data, {
      onError: (error: any) => {
        if (error?.response?.data?.verify_email) {
          push('?stage=checkYourEmail')
        }
        const setError = form.setError
        checkErrorMessage({
          setError,
          field: 'email',
          message: '',
          error: error?.response?.data?.errors?.user_does_not_exist,
        })
        checkErrorMessage({
          setError,
          field: 'password',
          message: t('errors:userDoesNotExist'),
          error: error?.response?.data?.errors?.user_does_not_exist,
        })
      },
      onSuccess: (response) => {
        setCookie('userInfo', JSON.stringify(response.data))
      },
    })
  }

  return {
    t,
    errors,
    isTypePassword,
    setIsTypePassword,
    handleSubmit: form.handleSubmit,
    form,
    locale,
    showFeedback,
    loginWithGoogle,
    register: form.register,
  }
}
