import React from 'react'
import { CheckYourEmailSvg, FeedbackLayout } from 'components/index'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FeedbackProps } from 'types'

const CheckYourEmail: React.FC<FeedbackProps> = (props) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <FeedbackLayout
      setHasScrollBar={props.setHasScrollBar}
      feedback='checkYourEmail'
    >
      <div>
        <CheckYourEmailSvg />
      </div>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-6 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:thankYou')}
      </p>
      <p
        className={`font-light text-r0081 sm:text-r0095 mt-8 text-white text-center align-middle w-r18 sm:w-r28 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:checkYourEmail')}
      </p>
      <Link
        href='https://mail.google.com'
        passHref
        type='submit'
        className={`bg-signInRed h-r027 w-60 sm:w-r24 flex justify-center items-center rounded-md mt-10 cursor-pointer`}
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
    </FeedbackLayout>
  )
}

export default CheckYourEmail
