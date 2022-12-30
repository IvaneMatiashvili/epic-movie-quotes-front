import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { SetStateType } from 'types'

export const useForm = () => {
  const { register, setValue } = useFormContext()
  const { locale } = useRouter()

  const inputReference = useRef<HTMLInputElement>(null)

  const changePasswordType = (
    isTypePassword: boolean,
    setIsTypePassword: SetStateType<boolean>
  ) => {
    isTypePassword ? setIsTypePassword(false) : setIsTypePassword(true)
    inputReference.current !== null && inputReference.current.focus()
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
  }
}
