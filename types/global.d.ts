import { Dispatch, SetStateAction } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { store } from 'store'
import { ImageLoader, StaticImageData } from 'next/image'

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

export type Emails = {
  email: string
  primary_email: number
  email_verified_at: null | string
}

export type UserInformation = {
  name: string
  id: number
  google_id: string
  user_image: string
  emails: Emails<object>[]
}

export type SetStateString =
  | string
  | StaticImport
  | ImageLoader
  | StaticImageData
  | Blob
  | null

export type SetStateFile =
  | string
  | StaticImport
  | File
  | ImageLoader
  | Blob
  | null

export type CreateNewEmail = {
  setUserEmails: SetState<Emails[]>
  setDefaultUserEmails: SetState<Emails[]>
}
