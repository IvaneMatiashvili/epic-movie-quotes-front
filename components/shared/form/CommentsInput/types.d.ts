import { Comments, SetState } from 'types'

export type Props = {
  userQuoteId?: string
  page?: number
  setUpdatedUserComments?: SetState<Comments[]>
}
