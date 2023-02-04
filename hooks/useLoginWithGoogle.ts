import { useState } from 'react'
import { useQuery } from 'react-query'
import { loginUserWithGoogle, loginUserWithGoogleCallback } from 'services'
import { useRouter } from 'next/router'
import { SetError } from 'types'
import { useTranslation } from 'next-i18next'
import { checkErrorMessage } from 'helpers'
import { setCookie } from 'cookies-next'
import { setUserData } from 'store'
import { useDispatch } from 'react-redux'

export const useLoginWithGoogle = (setError: SetError, form: string) => {
  const { locale, push, query, asPath } = useRouter()
  const { from, code, prompt, stage } = query
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isLoginWithGoogleClicked, setIsLoginWithGoogleClicked] =
    useState(false)

  useQuery(
    ['loginWithGoogle', [stage, locale]],
    () => loginUserWithGoogle(stage as string, locale as string),
    {
      onSuccess: (r) => {
        push(r.data.url)
      },
      enabled: isLoginWithGoogleClicked,
    }
  )

  useQuery(
    ['loginWithGoogleCallback', asPath],
    () =>
      loginUserWithGoogleCallback(asPath, stage as string, locale as string),
    {
      onSuccess: async (response) => {
        setCookie('userInfo', response?.data.id)
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        dispatch(setUserData(response.data))
        await push('profile')
      },
      onError: (err: any) => {
        if (form === 'login') {
          checkErrorMessage({
            setError,
            field: 'email',
            message: t(`errors:nameExists`),
            error: err?.response?.data?.errors?.credentials_exist,
          })
          checkErrorMessage({
            setError,
            field: 'email',
            message: t(`errors:emailExists`),
            error: err?.response?.data?.errors?.email,
          })
          checkErrorMessage({
            setError,
            field: 'email',
            message: t(`errors:credentialsExist`),
            error: err?.response?.data?.errors?.name,
          })
        } else {
          checkErrorMessage({
            setError,
            field: 'email',
            message: t('errors:emailExists'),
            error: err?.response?.data?.errors?.email,
          })

          checkErrorMessage({
            setError,
            field: 'name',
            message: t('errors:nameExists'),
            error: err?.response?.data?.errors?.name,
          })
        }
      },
      enabled: !!from && !!code && !!prompt,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  return {
    setIsLoginWithGoogleClicked,
  }
}
