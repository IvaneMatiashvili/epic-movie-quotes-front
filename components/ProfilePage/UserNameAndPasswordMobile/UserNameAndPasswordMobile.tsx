import React from 'react'
import { UserNameAndPasswordProps } from './types'
import { useTranslationAndLocale } from 'hooks'
import Link from 'next/link'

const UserNameAndPasswordMobile: React.FC<UserNameAndPasswordProps> = ({
  name,
  content,
  label,
}) => {
  const { t, locale } = useTranslationAndLocale()
  return (
    <>
      <div className='flex flex-col w-r18 nm:w-r21 mt-10'>
        <div>
          <div className='w-full flex justify-between'>
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white cursor-default`}
            >
              {label}
            </p>

            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white cursor-default opacity-0
                  `}
            >
              {t('profile:edit')}
            </p>
          </div>
        </div>
        <div>
          <div className='w-full flex justify-between mt-2'>
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base ${
                content === 'password' ? 'text-smoothGrayText' : 'text-white'
              } cursor-default`}
            >
              {name && name}
            </p>

            <Link
              href={
                content === 'userName'
                  ? '/profile?stage=updateUsername'
                  : '/profile?stage=updatePassword'
              }
              locale={locale}
              passHref
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-smoothGrayText
                  `}
            >
              {t('profile:edit')}
            </Link>
          </div>
        </div>
      </div>

      <div className='w-r18 nm:w-r21 h-0.1 bg-grayLine mt-4'></div>
    </>
  )
}

export default UserNameAndPasswordMobile
