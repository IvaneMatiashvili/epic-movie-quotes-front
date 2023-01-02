import Image from 'next/image'
import gandalf from '/public/assets/gandalf.png'
import gandalfBackground from '/public/assets/gandalfBackground.png'
import Link from 'next/link'
import React from 'react'
import { useErrorPage } from './useErrorPage'

const ForbiddenPage = () => {
  const { t, locale } = useErrorPage()
  return (
    <div className='w-full h-screen bg-darkBlue flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center h-60'>
        <Image src={gandalf} alt='gandalf' className='relative z-10 w-r2005' />
        <Image
          src={gandalfBackground}
          alt='gandalfBackground'
          className='w-r14662 relative top-[-11.5rem]'
        />
      </div>
      <p
        className={`font-bold text-3xl sm:text-5xl text-white mt-8 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('403:youShallNotPass')}
      </p>
      <p
        className={`font-normal text-r0096 sm:text-lg lg:text-2xl text-white mt-8 text-center lg:w-full sm:w-r40 nm:w-r22 w-r18 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('403:permissionDenied')}
      </p>

      <Link
        href='/'
        className='flex items-center justify-center  bg-danger w-48 h-12 mt-12 rounded-lg'
      >
        <p
          className={`font-normal text-lg text-white ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('common:returnHome')}
        </p>
      </Link>
    </div>
  )
}

export default ForbiddenPage
