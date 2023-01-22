import { Dispatch, SetStateAction } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { store } from 'store'
import { StaticImageData } from 'next/image'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type FeedbackProps = {
  setHasScrollBar: SetState<boolean>
}

export type Locale = { locale: string }

export type SetError = UseFormSetError

export interface FormObj {
  [key: string]: string
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type UserInformation = {
  name: string
  user_id: string
  google_id: string
  user_image: string
  emails: object[object]
}

export type SetStateString = string | StaticImageData | null
export type SetStateFile = string | Blob | File | null
