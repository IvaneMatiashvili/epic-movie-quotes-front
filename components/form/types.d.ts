import { SetStateType } from 'types'
import { FieldError } from 'react-hook-form'

export type InputTypeTextPropsType = {
  name: string
  errors: object
  id: string
  key: string
  isTypePassword: boolean | null
  setIsTypePassword: SetStateType<boolean> | null
  placeholder: string
  labelContent: string
  error: FieldError | undefined
}

export type ErrorPropsType = {
  errors: object
  name: string
}
