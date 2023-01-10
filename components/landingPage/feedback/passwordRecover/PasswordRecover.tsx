import React from 'react'
import { CheckYourEmailSvg, FeedbackLayout } from 'components'
import Link from 'next/link'
import { FeedbackProps } from 'types'
import { useTranslationAndLocale } from 'hooks'

const PasswordRecover: React.FC<FeedbackProps> = (props) => {
  const { t, locale } = useTranslationAndLocale()

  return (
    <FeedbackLayout
      setHasScrollBar={props.setHasScrollBar}
      feedback='passwordRecover'
    >
      <div>
        <CheckYourEmailSvg />
      </div>
      <p
        className={`font-normal text-xl sm:text-3xl text-white mt-6 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:checkYourEmailText')}
      </p>
      <p
        className={`font-light text-r0081 sm:text-r0095 mt-10 text-white text-center align-middle w-r18 sm:w-r26 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:passwordRecover')}
      </p>
      <Link
        href='https://mail.google.com'
        passHref
        type='submit'
        className={`bg-signInRed h-r027 w-full sm:w-r24 flex justify-center items-center rounded-md mt-10 cursor-pointer`}
      >
        <p
          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
        >
          {t('home:goToEmail')}
        </p>
      </Link>
      <Link
        href='/'
        className={`font-light text-sm mt-10 text-grayJourney ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:confirmLater')}
      </Link>
    </FeedbackLayout>
  )
}

export default PasswordRecover
