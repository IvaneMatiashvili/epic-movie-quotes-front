import React from 'react'
import { EmailApproveSvg, FeedbackLayout } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FeedbackProps } from 'types'

const PasswordChanged: React.FC<FeedbackProps> = (props) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <FeedbackLayout
      setHasScrollBar={props.setHasScrollBar}
      feedback='EmailActivated'
    >
      <div>
        <EmailApproveSvg />
      </div>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-6 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:thankYou')}
      </p>
      <p
        className={`font-light text-xs nm:text-sm sm:text-base mt-8 text-white text-center align-middle w-r19 sm:w-r28 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:passwordChanged')}
      </p>
      <Link
        href='?stage=login'
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
          {t('home:logIn')}
        </p>
      </Link>
    </FeedbackLayout>
  )
}

export default PasswordChanged
