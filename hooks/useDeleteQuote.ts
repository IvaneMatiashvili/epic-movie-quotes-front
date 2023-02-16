import { useMutation, useQueryClient } from 'react-query'
import { deleteQuote } from 'services'
import { useRouter } from 'next/router'

export const useDeleteQuote = () => {
  const { push, query } = useRouter()
  const { movie } = query
  const queryClient = useQueryClient()

  const { mutate: deleteCurrentQuote } = useMutation(deleteQuote)

  const deleteQuoteAndRedirect = (quoteId: string) => {
    deleteCurrentQuote(
      { quote_id: quoteId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries('movie')
          push(`/movies/${movie}`)
        },
      }
    )
  }
  return {
    deleteQuoteAndRedirect,
  }
}
