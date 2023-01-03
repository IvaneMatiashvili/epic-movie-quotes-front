import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FourOhFourPage } from 'components'
import { Locale } from 'types'

const FourOhFour = () => {
  return <FourOhFourPage />
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['404', 'common'])),
    },
  }
}

export default FourOhFour
