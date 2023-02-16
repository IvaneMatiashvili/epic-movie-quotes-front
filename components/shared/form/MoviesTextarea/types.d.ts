import { FieldError } from 'react-hook-form'

export type MoviesTextarea = {
  id: string
  name: string
  placeholder: string
  isEnglish: boolean
  errors: object
  key: string
  value?: string
  error?: FieldError | undefined
  disabled?: boolean
}
