import { FieldError } from 'react-hook-form'

export type MoviesInputTypeTextProps = {
  name: string
  errors: object
  id: string
  key: string
  placeholder: string
  isEnglish: boolean
  error: FieldError | undefined
  budget?: boolean
  value?: string
}
