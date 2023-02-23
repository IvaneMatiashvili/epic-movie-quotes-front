import { SetState } from 'types'

export type Props = {
  closeWriteNewQuoteModal: () => Void
  setIsNewQuoteCreated: SetState<boolean>
}
