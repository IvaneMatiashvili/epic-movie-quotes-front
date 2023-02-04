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
  isSubmitFormOpen: boolean | null
  setIsSubmitFormOpen: SetState<boolean> | null
}

export type UseEmailLayout = {
  email: string
  userEmails: Emails[]
  setUserEmails: SetState<Emails[]>
  setRemovedEmails: SetState<string[]>
  setValue: UseFormSetVal
  setIsEditModeOn: SetState<boolean>
  primaryEmail: string
  setPrimaryEmail: SetState<string | undefined>
  setIsSubmitFormOpen: SetState<boolean> | null
}
