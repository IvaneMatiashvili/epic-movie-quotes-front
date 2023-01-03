import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ForbiddenPage } from 'components'
import { Locale } from 'types'

const Forbidden = () => {
  return <ForbiddenPage />
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['403', 'common'])),
    },
  }
}

export default Forbidden
