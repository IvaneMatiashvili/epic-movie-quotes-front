import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { createNewEmail } from 'services'
import { Emails, FormObj, SetState } from 'types'
import { setCookie } from 'cookies-next'
import 'react-toastify/dist/ReactToastify.css'
import { checkErrorMessage, reactToastify } from 'helpers'

export const useCreateNewEmail = (
  setUserEmails: SetState<Emails[]>,
  setDefaultUserEmails: SetState<Emails[]>
) => {
  const { locale, push, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()

  const { mutate: submitForm, isLoading } = useMutation(createNewEmail)

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
        checkErrorMessage({
          setError: form.setError,
          field: 'email',
          message: t('errors:emailExists'),
          error: error?.response?.data?.errors?.email,
        })
      },
      onSuccess: async (response) => {
        setCookie('userInfo', response?.data.id)
        localStorage.setItem('userInfo', JSON.stringify(response.data))

        setUserEmails((arr: object[]) => [
          ...arr,
          response.data.emails.filter(
            (email: Emails) => email.email === data['email']
          )[0],
        ])

        setDefaultUserEmails((arr: object[]) => [
          ...arr,
          response.data.emails.filter(
            (email: Emails) => email.email === data['email']
          )[0],
        ])

        reactToastify(t('profile:pleaseCheckEmail'), true)

        await push('profile')
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
    register: form.register,
    query,
    stage,
    isLoading,
  }
}
