import { SetState } from 'types'
import { FieldError } from 'react-hook-form'

export type InputTypeEmailAndPasswordProps = {
  name: string
  input: string
  errors: object
  id: string
  key: string
  isTypePassword: boolean | null
  setIsTypePassword: SetState<boolean> | null
  placeholder: string
  labelContent: string
  error: FieldError | undefined
}
