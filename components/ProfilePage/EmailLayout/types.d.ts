import { Emails, SetState } from 'types'

export type EmailLayoutProps = {
  email: string
  emailFullObj: Emails
  userEmails: Emails[]
  setUserEmails: SetState<Emails[]>
  setRemovedEmails: SetState<string[]>
  setValue: UseFormSetVal
  setIsEditModeOn: SetState<boolean>
  primaryEmail: string
  setPrimaryEmail: SetState<string | undefined>
  isSubmitFormOpen?: boolean
  setIsSubmitFormOpen?: SetState<boolean>
}
