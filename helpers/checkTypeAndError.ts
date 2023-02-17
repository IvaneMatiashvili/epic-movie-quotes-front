import { TypeAndError } from './types'

export const checkTypeAndError = ({
  name,
  isTypePassword,
  error,
  isUndefinedError,
}: TypeAndError) => {
  if (!name) {
    if (typeof window !== 'undefined' && !error && isUndefinedError) {
      const pathname = window.location.pathname.split('/')
      if (pathname[1] !== 'movies' && pathname[2] !== 'movies') {
        return 'border-borderGray'
      }
    } else if ((error && !isUndefinedError) || (error && isUndefinedError)) {
      return 'border-borderRed'
    } else {
      return 'border-borderGreen'
    }
  } else {
    if (
      isTypePassword &&
      (name === 'password' || name === 'confirm_password')
    ) {
      return 'password'
    } else {
      return 'text'
    }
  }
}
