import React from 'react'
import { CloseIcon, NotificationApproveIcon } from 'components'
import { NotificationPageProps } from './types'
import { useTranslationAndLocale } from 'hooks'

const Notification: React.FC<NotificationPageProps> = (props) => {
  const { t, locale } = useTranslationAndLocale()
  return (
    <>
      {props.verifyEmail && (
        <div>
          <div className='flex items-center '>
            <div>
              <NotificationApproveIcon />
            </div>
            <div>
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-sm hidden sm:block text-greenDarkText  ml-4`}
              >
                {t('profile:simpleAlert')}
              </p>
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-sm sm:hidden text-greenDarkText ml-4 mr-2 nm:mr-16`}
              >
                {t('profile:simpleAlertMobile')}
              </p>
            </div>
            <div className={`${locale === 'en' ? 'ml-r06' : 'ml-r075'}`}>
              <CloseIcon />
            </div>
          </div>
          <div className='flex h-16 '>
            <div className='opacity-0'>
              <NotificationApproveIcon />
            </div>
            <div>
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-xs text-blackBlueSoft ml-4 mt-4`}
              >
                {props.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {!props.verifyEmail && (
        <div>
          <div className='flex items-center '>
            <div>
              <NotificationApproveIcon />
            </div>
            <div>
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-xs sm:text-sm text-greenDarkText w-58 sm:w-r1605 ml-4 mr-8 sm:mr-6`}
              >
                {props.content}
              </p>
            </div>
            <div className={`${locale === 'en' ? 'ml-6' : 'ml-14'}`}>
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Notification
