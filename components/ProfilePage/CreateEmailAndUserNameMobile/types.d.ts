import { Emails, SetState } from 'types'

export type CreateEmailAndChangePasswordMobileProps = {
  setUserEmails: null | SetState<Emails[]>
  name: string
  input: string
  errors: object
  id: string
  key: string
  placeholder: string
  labelContent: string
  setDefaultUserEmails: null | SetState<Emails[]>
  profile: string
}
export type CreateEmailAndChangePasswordMobile = {
  setUserEmails: null | SetState<Emails[]>
  setDefaultUserEmails: null | SetState<Emails[]>
  name: string
}
