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

export interface BroadcastData {
  [key: string]: string | Function
}

export interface RemovedNotificationIdsObj {
  [key: string]: (string | undefined)[][]
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

export interface Translation {
  [key: string]: string
}
export type Comments = {
  comment?: string
  user?: UserInformation
  created_at?: string
  id?: string
}

export type Likes = {
  like?: string
  user?: UserInformation
  id?: string
}

export type Notificatable = {
  like?: string
  user?: UserInformation
  comment?: string
  quote_id?: string
}

export type NewsFeedNotification = {
  notificatable?: Notificatable
  created_at?: string
  id?: string
  is_notification_on?: boolean
}

export type Quote = {
  quote?: Translation
  id?: string
  thumbnail?: string
  comments?: Comments[]
  likes?: Likes[]
  movie_id?: string
  user_id?: string
}

export type Genres = {
  genre?: Translation
  [key: string]: string
}

export type Movies = {
  title?: Translation
  director?: Translation
  description?: Translation
  id?: string
  thumbnail?: string
  release_date?: string
  budget?: string
  quotes?: Quote[]
  user?: UserInformation
  user_id?: number
}
