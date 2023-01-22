import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Locale } from 'types'
import { ProfilePageMain } from 'components'

const FourOhFour = () => {
  return <ProfilePageMain />
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'profile',
        'common',
        'errors',
      ])),
    },
  }
}

export default FourOhFour
