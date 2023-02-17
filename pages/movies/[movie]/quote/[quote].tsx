import { ViewQuote } from 'components'
import { Locale } from 'types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'

const Quote = () => {
  return (
    <>
      <ViewQuote />
    </>
  )
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'profile',
        'common',
        'errors',
        'movies',
      ])),
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Quote
