import { SetState } from 'types'
import { FieldError } from 'react-hook-form'

export type InputTypeEmailAndPasswordProps = {
  name: string
  input: string
  errors: object
  id: string
  key: string
  isTypePassword?: boolean
  setIsTypePassword?: SetState<boolean>
  placeholder: string
  labelContent: string
  error: FieldError | undefined
}
