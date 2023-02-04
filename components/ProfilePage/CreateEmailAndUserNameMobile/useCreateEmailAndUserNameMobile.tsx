import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { createNewEmail, editUserInfo } from 'services'
import { Emails, FormObj } from 'types'
import { setCookie } from 'cookies-next'
import { checkErrorMessage, reactToastify } from 'helpers'

import { CreateEmailAndChangePasswordMobile } from './types'
import { useState } from 'react'
import { setUserData } from 'store'
import { useDispatch } from 'react-redux'

export const useCreateEmailAndUserNameMobile = ({
  setUserEmails,
  setDefaultUserEmails,
  name,
}: CreateEmailAndChangePasswordMobile) => {
  const { locale, push, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { mutate: submitEmailForm } = useMutation(createNewEmail)
  const queryClient = useQueryClient()
  const { mutate: submitNameForm } = useMutation(editUserInfo)

  const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'all',
  })
  const { errors, isValid } = form.formState

  const validateEmail = async () => {
    await form.trigger('email')
    await form.trigger('name')
    if (isValid) {
      setIsSubmitFormOpen(true)
    }
  }

  const showFeedback = async (data: FormObj) => {
    if (name === 'email') {
      submitEmailForm(data, {
        onError: (error: any) => {
          checkErrorMessage({
            setError: form.setError,
            field: 'email',
            message: t('errors:emailExists'),
            error: error?.response?.data?.errors?.email,
          })

          setIsSubmitFormOpen(false)
        },
        onSuccess: async (response) => {
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          setCookie('userInfo', response?.data.id)
          dispatch(setUserData(JSON.stringify(response?.data)))

          reactToastify({
            content: t('profile:pleaseCheckEmail'),
            verifyEmail: true,
          })
          if (setDefaultUserEmails) {
            setDefaultUserEmails((arr: object[]) => [
              ...arr,
              response.data.emails.filter(
                (email: Emails) => email.email === data['email']
              )[0],
            ])
          }

          if (setUserEmails) {
            setUserEmails((arr: object[]) => [
              ...arr,
              response.data.emails.filter(
                (email: Emails) => email.email === data['email']
              )[0],
            ])
          }
          await queryClient.invalidateQueries('userInfo')

          await push('profile?stage=showEmails')
        },
      })
    } else {
      const formData = new FormData()

      formData.append('name', data['name'])

      submitNameForm(formData, {
        onSuccess: async (response) => {
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          setCookie('userInfo', response?.data.id)
          dispatch(setUserData(JSON.stringify(response?.data)))

          await queryClient.invalidateQueries('userInfo')

          reactToastify({
            content: t('profile:userNameChanged'),
            verifyEmail: false,
          })
          await push('profile')
        },
        onError: (error: any) => {
          const setError = form.setError
          checkErrorMessage({
            setError,
            field: 'name',
            message: t('errors:nameExists'),
            error: error?.response?.data?.errors?.user_exist,
          })
        },
      })
    }
  }

  return {
    t,
    errors,
    handleSubmit: form.handleSubmit,
    form,
    locale,
    showFeedback,
    register: form.register,
    query,
    validateEmail,
    isSubmitFormOpen,
    setIsSubmitFormOpen,
    stage,
  }
}
