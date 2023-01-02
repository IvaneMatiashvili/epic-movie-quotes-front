import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FourOhFourPage } from 'components'

const FourOhFour = () => {
  return <FourOhFourPage />
}
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['404', 'common'])),
    },
  }
}

export default FourOhFour
