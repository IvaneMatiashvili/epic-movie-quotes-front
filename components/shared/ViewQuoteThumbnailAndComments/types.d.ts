import { Comments, Quote } from 'types'

export type Props = {
  currentQuote: Quote
  fromNewsFeed?: boolean
  updatedUserComments: Comments[]
}
