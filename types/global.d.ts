import { Dispatch, SetStateAction } from 'react'
import { UseFormSetError } from 'react-hook-form'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type FeedbackProps = {
  setHasScrollBar: SetState<boolean>
}
export type Locale = { locale: string }

export type SetError = UseFormSetError
export interface FormObj {
  [key: string]: string
}
