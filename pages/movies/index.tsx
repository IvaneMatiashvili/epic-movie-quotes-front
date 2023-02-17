import { MoviesPageMain } from 'components'
import { Locale } from 'types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
  return (
    <>
      <MoviesPageMain />
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

export default Index
