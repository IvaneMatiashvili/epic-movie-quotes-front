import { TypeAndError } from './types'

export const checkTypeAndError = ({
  name,
  isTypePassword,
  error,
  isUndefinedError,
}: TypeAndError) => {
  if (!name) {
    if (!error && isUndefinedError) {
      return 'border-borderGray'
    } else if ((error && !isUndefinedError) || (error && isUndefinedError)) {
      return 'border-borderRed'
    } else {
      return 'border-borderGreen'
    }
  } else {
    if (
      (name === 'password' && isTypePassword) ||
      (name === 'confirm_password' && isTypePassword)
    ) {
      return 'password'
    } else {
      return 'text'
    }
  }
}
