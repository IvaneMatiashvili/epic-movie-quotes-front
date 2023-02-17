import React, { Dispatch, SetStateAction } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { store } from 'store'

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

export type SetStateFileOrNull = File | null

export type CreateNewEmail = {
  setUserEmails: SetState<Emails[]>
  setDefaultUserEmails: SetState<Emails[]>
}

export type ReactDivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

export type Transition = {
  en: string
  ka: string
}
export type Comments = {
  comment: string
  user: UserInformation
}

export type Likes = {
  like: string
}

export type Quote = {
  quote?: Transition
  id?: string
  thumbnail?: string
  comments?: Comments[]
  likes?: Likes[]
}

export type Genres = {
  genre: string
}

export type Movies = {
  title?: Transition
  director?: Transition
  description?: Transition
  id?: number
  thumbnail?: string
  release_date?: string
  budget?: string
  quotes?: Quote[]
}
