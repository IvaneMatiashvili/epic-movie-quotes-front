import { SetError } from 'types'
import { FieldError } from 'react-hook-form'

export type CheckErrorMessageData = {
  setError: SetError
  field: string
  message: string
  error: any
}

export type TypeAndError = {
  name?: string
  isTypePassword?: boolean
  error?: FieldError | undefined
  isUndefinedError?: boolean
}
export type ReactToastify = {
  content: string
  verifyEmail: boolean
}
