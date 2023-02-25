import { SetState } from 'types'

export type UserPageProps = {
  children: JSX.Element
  openEditOrDelete?: boolean[]
  setIsSetBackground?: SetState<boolean>
  setIsSearchMobileOpen?: SetState<boolean>
  isSearchMobileOpen?: boolean
  setIsSearchOpen?: SetState<boolean>
  setIsWriteNewQuoteModalOpen?: SetState<boolean>
}
