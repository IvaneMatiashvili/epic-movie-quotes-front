import { SetState } from 'types'
import { FieldError } from 'react-hook-form'

export type InputTypeTextProps = {
  name: string
  errors: object
  id: string
  key: string
  isTypePassword: boolean | null
  setIsTypePassword: SetState<boolean> | null
  placeholder: string
  labelContent: string
  error: FieldError | undefined
}

export type ErrorProps = {
  errors: object
  name: string
}
