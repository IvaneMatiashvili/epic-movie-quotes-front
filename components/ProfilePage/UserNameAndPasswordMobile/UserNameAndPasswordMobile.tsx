import React from 'react'
import { UserNameAndPasswordProps } from './types'
import { useTranslationAndLocale } from 'hooks'
import Link from 'next/link'

const UserNameAndPasswordMobile: React.FC<UserNameAndPasswordProps> = (
  props
) => {
  const { t, locale } = useTranslationAndLocale()
  return (
    <>
      <div className='flex flex-col w-[85%] mt-10'>
        <div>
          <div className='w-full flex justify-between'>
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white cursor-default`}
            >
              {props.label}
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
                props.content === 'password'
                  ? 'text-smoothGrayText'
                  : 'text-white'
              } cursor-default`}
            >
              {props.name && props.name}
            </p>

            <Link
              href={
                props.content === 'userName'
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

      <div className='w-[85%] h-0.1 bg-grayLine mt-4'></div>
    </>
  )
}

export default UserNameAndPasswordMobile
