import { useVerifyEmail } from 'hooks'
import Head from 'next/head'
import React from 'react'

const VerifyEmail = () => {
  useVerifyEmail()
  return (
    <>
      <Head>
        <title>Epic-movie-quotes</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
    </>
  )
}

export default VerifyEmail
