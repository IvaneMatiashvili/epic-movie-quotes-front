import { Comments, Quote } from 'types'

export type ViewQuoteThumbnailAndCommentsProps = {
  currentQuote: Quote
  fromNewsFeed?: boolean
  updatedUserComments: Comments[]
  quoteUserId: string
}
