import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { SetState } from 'types'

export const useForm = (name: string) => {
  const { register, setValue } = useFormContext()
  const { locale } = useRouter()

  const inputReference = useRef<HTMLInputElement>(null)

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
    event.target.value = event.target.value.trim()
    setUndefinedError(false)
    setValue(name, event.target.value.trim(), {
      shouldValidate: true,
    })
  }

  const [isUndefinedError, setUndefinedError] = useState(true)

  return {
    register,
    setValue,
    locale,
    inputReference,
    changePasswordType,
    isUndefinedError,
    setUndefinedError,
    changeInputValue,
  }
}
