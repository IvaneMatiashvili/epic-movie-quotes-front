import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { SetState } from 'types'

export const useForm = (name: string) => {
  const { register, setValue } = useFormContext()
  const { locale, query } = useRouter()
  const { edit } = query

  const inputReference = useRef<HTMLInputElement>(null)
  const [isFirstAttempt, setIsFirstAttempt] = useState(false)

  const changePasswordType = (
    isTypePassword: boolean,
    setIsTypePassword: SetState<boolean>
  ) => {
    isTypePassword ? setIsTypePassword(false) : setIsTypePassword(true)
    inputReference.current !== null && inputReference.current.focus()
  }

  const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value.trim().length === 0) {
      event.target.value = event.target.value.trim()
    }
    setUndefinedError(false)
    setValue(name, event.target.value.trim(), {
      shouldValidate: true,
    })
  }

  const setValueOnBlur: React.ChangeEventHandler<HTMLInputElement> = (
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
    changePasswordType,
    changeInputValue,
    isUndefinedError,
    setValueOnBlur,
    edit,
  }
}
