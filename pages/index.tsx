import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LandingPageMain } from 'components'
import { NextPage } from 'next'
import { Locale } from 'types'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Epic-movie-quotes</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LandingPageMain />
    </>
  )
}
export const getStaticProps = async ({ locale }: Locale) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'errors'])),
    },
  }
}
export default Home
