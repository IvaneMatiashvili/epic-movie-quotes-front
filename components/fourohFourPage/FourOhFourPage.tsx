import Image from 'next/image'
import { ghost, shadow } from 'public'
import Link from 'next/link'
import React from 'react'
import { useTranslationAndLocale } from "hooks";

const FourOhFourPage = () => {
  const { t, locale } = useTranslationAndLocale()

  return (
    <div className='w-full h-screen bg-darkBlue flex flex-col justify-center items-center'>
      <Image src={ghost} alt='ghost' />
      <Image src={shadow} alt='shadow' className='mt-8' />
      <p
        className={`font-bold text-3xl sm:text-5xl text-white mt-8 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('404:whoops')}
      </p>
      <p
        className={`font-normal text-r0081 nm:text-r0096 sm:text-2xl text-white mt-8 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('404:pageNotFound')}
      </p>

      <Link
        href='/'
        passHref
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

export default FourOhFourPage
