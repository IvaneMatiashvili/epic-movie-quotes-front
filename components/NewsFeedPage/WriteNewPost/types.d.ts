import { SetState } from 'types'

export type WriteNewProps = {
  closeWriteNewQuoteModal: () => Void
  setIsNewQuoteCreated: SetState<boolean>
}
