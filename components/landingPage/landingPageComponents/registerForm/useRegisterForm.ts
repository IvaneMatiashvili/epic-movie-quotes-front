import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { createUser } from 'services'
import { FormObj } from './types'

export const useRegisterForm = () => {
  const queryClient = useQueryClient()

  const { mutate: submitForm, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('registerForm')
    },
  })

  const { locale, push } = useRouter()

  const { t } = useTranslation()

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

  const watchPassword = useWatch({
    control: form.control,
    name: 'password',
  })
  const watchPasswordConfirmation = useWatch({
    control: form.control,
    name: 'confirm_password',
  })

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

  const [isTypePassword, setIsTypePassword] = useState(true)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true)

  const showFeedback = async (data: FormObj) => {
    data['password_confirmation'] = data['confirm_password']
    delete data['confirm_password']

    submitForm(data, {
      onError: () => {},
    })
    await push('?stage=checkYourEmail')
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
  }
}
