import { Emails, SetState } from 'types'

export type CreateNewEmailProps = {
  setUserEmails: SetState<Emails[]>
  setDefaultUserEmails: SetState<Emails[]>
}
export type CreateNewEmail = {
  setUserEmails: SetState<Emails[]>
  setDefaultUserEmails: SetState<Emails[]>
}
