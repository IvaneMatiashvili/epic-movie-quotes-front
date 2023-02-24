import { TypeAndError } from './types'

export const checkTypeAndError = ({
  name,
  isTypePassword,
  error,
  isUndefinedError,
  forImage,
  forMovieOrNewsFeedPage,
}: TypeAndError) => {
  if (!name) {
    if (!error && isUndefinedError) {
      if (!forMovieOrNewsFeedPage) {
        return 'border-borderGray'
      }
    } else if ((error && !isUndefinedError) || (error && isUndefinedError)) {
      return 'border-borderRed'
    } else {
      if (forImage) {
        return 'border border-borderGreen'
      } else {
        return 'border-borderGreen'
      }
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
