import { Comments, SetState } from 'types'

export type CommentsInputProps = {
  userQuoteId?: string
  page?: number
  setUpdatedUserComments?: SetState<Comments[]>
  quoteUserId?: number
}
