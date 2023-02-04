import { SetError } from 'types'
import { FieldError } from 'react-hook-form'

export type CheckErrorMessageData = {
  setError: SetError
  field: string
  message: string
  error: any
}

export type TypeAndError = {
  name: string | null
  isTypePassword: boolean | null
  error: FieldError | undefined | null
  isUndefinedError: boolean | null
}
