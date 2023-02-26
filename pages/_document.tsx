import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <title>Epic-movie-quotes</title>
        <link rel='shortcut icon' href='/assets/video.svg' />
      </Head>
      <body className='overflow-x-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
