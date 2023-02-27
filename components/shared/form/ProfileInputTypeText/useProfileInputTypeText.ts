import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SetState } from 'types'

export const useProfileInputTypeText = (
  setIsUndefinedNamesError: SetState<boolean>
) => {
  const { register, setValue } = useFormContext()
  const { locale } = useRouter()
  const { t } = useTranslation()

  const [isUndefinedError, setUndefinedError] = useState(true)
  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.target.value = event.target.value.trim()
    setUndefinedError(false)
    setIsUndefinedNamesError(false)
    setValue('name', event.target.value.trim(), {
      shouldValidate: true,
    })
  }

  return {
    register,
    setValue,
    locale,
    isUndefinedError,
    setUndefinedError,
    t,
    changeInputValue,
  }
}
