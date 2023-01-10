import { SetError } from 'types'

export type CheckErrorMessageData = {
  setError: SetError
  field: string
  message: string
  error: any
}
