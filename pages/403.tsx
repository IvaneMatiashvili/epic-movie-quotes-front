import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ForbiddenPage } from 'components'

const Forbidden = () => {
  return <ForbiddenPage />
}
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['403', 'common'])),
    },
  }
}

export default Forbidden
