import { Emails, SetState } from 'types'

export type CreateEmailAndChangePasswordMobileProps = {
  setUserEmails?: SetState<Emails[]>
  name: string
  input: string
  errors: object
  id: string
  key: string
  placeholder: string
  labelContent: string
  setDefaultUserEmails?: SetState<Emails[]>
  profile: string
}
export type CreateEmailAndChangePasswordMobile = {
  setUserEmails?: SetState<Emails[]>
  setDefaultUserEmails?: SetState<Emails[]>
  name: string
}
