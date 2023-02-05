import { FieldError } from 'react-hook-form'
import { SetState } from 'types'

export type ProfileInputTypeTextProps = {
  name: string
  errors: object
  id: string
  key: string
  labelContent: string
  error: FieldError | undefined
  isEditModeOn?: boolean
  setIsEditModeOn?: SetState<boolean>
}
