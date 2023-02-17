import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const useAddQuoteUserAndMovieInfo = () => {
  const { locale, query } = useRouter()
  const { movie, quote, stage } = query
  const { t } = useTranslation()

  return {
    locale,
    t,
    movie,
    quote,
    stage,
  }
}
