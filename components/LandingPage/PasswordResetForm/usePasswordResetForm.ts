import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MutationFunction, useMutation, useQuery } from 'react-query'
import { getPasswordResetForm, resetPassword } from 'services'
import { FormObj } from 'types'

export const usePasswordResetForm = () => {
  const form = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    mode: 'all',
  })
  const watchPassword = useWatch({
    control: form.control,
    name: 'password',
  })
  const watchPasswordConfirmation = useWatch({
    control: form.control,
    name: 'confirm_password',
  })
  const { errors, isValid } = form.formState
  const { t } = useTranslation()

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

  const { locale, query, push } = useRouter()

  const { feedback, signature, paramId, stage } = query

  const { mutate: submitForm } = useMutation(
    resetPassword as MutationFunction,
    {
      onSuccess: () => {
        push('?stage=passwordChanged')
      },
    }
  )

  useQuery(
    ['verifyUser', `${feedback}&paramId=${paramId}&signature=${signature}`],
    () =>
      getPasswordResetForm(
        `${feedback}&paramId=${paramId}&signature=${signature}`
      ),
    {
      onError: () => {
        push('/404')
      },
      enabled: !!stage,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  const showFeedback = async (data: FormObj) => {
    data['password_confirmation'] = data['confirm_password']
    delete data['confirm_password']

    submitForm({
      url: `${feedback}&paramId=${paramId}&signature=${signature}`,
      data,
    })
  }

  const [isTypePassword, setIsTypePassword] = useState(true)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true)

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
