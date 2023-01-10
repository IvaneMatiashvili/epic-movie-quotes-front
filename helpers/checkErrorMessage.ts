import { CheckErrorMessageData } from './types'

export const checkErrorMessage = ({
  error,
  field,
  message,
  setError,
}: CheckErrorMessageData) => {
  if (error) {
    setError(field, { type: 'custom', message })
  }
}
