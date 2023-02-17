import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

export const useForm = (name: string) => {
  const { register, setValue } = useFormContext()
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { edit } = query

  const inputReference = useRef<HTMLTextAreaElement>(null)
  const [isFirstAttempt, setIsFirstAttempt] = useState(false)

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value.trim().length === 0) {
      event.target.value = event.target.value.trim()
    }
    setValue(name, event.target.value.trim(), {
      shouldValidate: true,
    })
    setUndefinedError(false)
  }

  const setValueOnBlur: React.FocusEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (edit && !isFirstAttempt) {
      setUndefinedError(false)
      setIsFirstAttempt(true)
      setValue(name, event.target.value.trim(), {
        shouldValidate: true,
      })
    }
  }
  const [isUndefinedError, setUndefinedError] = useState(true)

  return {
    register,
    setValue,
    locale,
    inputReference,
    changeInputValue,
    isUndefinedError,
    t,
    setValueOnBlur,
  }
}
