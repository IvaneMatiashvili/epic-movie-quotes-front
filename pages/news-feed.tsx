import { Locale } from 'types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NewsFeedMain } from 'components'

const NewsFeed = () => {
  return <NewsFeedMain />
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'profile',
        'common',
        'errors',
        'movies',
        'newsFeed',
      ])),
    },
  }
}

export default NewsFeed
