import React from 'react'
import { useEmailLayout } from './useEmailLayout'
import { EmailLayoutProps } from './types'
import { WarningGrayIcon, WarningIcon, WhiteDownArrowIcon } from 'components'
import Link from 'next/link'
import { ButtonAndCancelMobile } from '../ButtonAndCancelMobile'

const EmailLayout: React.FC<EmailLayoutProps> = (props) => {
  const {
    t,
    locale,
    removeEmail,
    makeEmailPrimary,
    isWarningOpen,
    showWarning,
    hideWarning,
  } = useEmailLayout({
    setUserEmails: props.setUserEmails,
    email: props.email,
    userEmails: props.userEmails,
    setRemovedEmails: props.setRemovedEmails,
    setValue: props.setValue,
    setIsEditModeOn: props.setIsEditModeOn,
    primaryEmail: props.primaryEmail,
    setPrimaryEmail: props.setPrimaryEmail,
    setIsSubmitFormOpen: props.setIsSubmitFormOpen,
  })

  return (
    <>
      <div className={`${props.isSubmitFormOpen && 'hidden'}`}>
        <div
          className={`${
            props.primaryEmail === props.email && 'sm:hidden'
          } hidden sm:block`}
        >
          {isWarningOpen && (
            <div className='absolute flex justify-start bg-white rounded-md w-r22 mt-minusR4 h-14 items-center ml-40 lgPlus:ml-r22 z-20'>
              <div className={'ml-4'}>
                <WarningGrayIcon />
              </div>
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-sm text-warningGrayText ml-4`}
              >
                {t('profile:pleaseVerifyNewEmailAddress')}
              </p>
            </div>
          )}

          <div className='absolute flex justify-center items-center mt-minusR006 ml-52 lgPlus:ml-r30 z-20'>
            {isWarningOpen && <WhiteDownArrowIcon />}
          </div>
          <label
            htmlFor={`email${props.email}`}
            className={`block font-normal text-base text-white mt-8
                  ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
          >
            {t('profile:email')}
          </label>
          <div className='flex justify-start items-center'>
            <div
              onMouseEnter={showWarning}
              onMouseLeave={hideWarning}
              className='absolute  flex justify-center items-center mt-2 ml-52 lgPlus:ml-r30 z-20'
            >
              {!props.emailFullObj.email_verified_at && <WarningIcon />}
            </div>

            <input
              disabled={true}
              value={props.email}
              id={`email${props.email}`}
              name='email'
              className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border
                  font-normal rounded text-base ${
                    !props.emailFullObj.email_verified_at
                      ? 'bg-orangeInput/20 text-white border-orangeInput backdrop-blur'
                      : 'bg-inputGray'
                  } pl-4 mt-2 w-[15rem] lgPlus:w-r32 h-r027 outline-none pr-11 sm:pr-10`}
            />

            {props.emailFullObj.email_verified_at && (
              <p
                onClick={makeEmailPrimary}
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm lgPlus:text-base text-white ml-10 cursor-pointer`}
              >
                {t('profile:makeThisPrimary')}
              </p>
            )}
            {!props.emailFullObj.email_verified_at && (
              <Link
                href='https://mail.google.com'
                passHref
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm lgPlus:text-base text-white ml-10`}
              >
                {t('profile:notVerified')}
              </Link>
            )}

            <div className='w-0.1 h-4 bg-grayLine opacity-70 ml-6'></div>

            <p
              onClick={removeEmail}
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm lgPlus:text-base text-white ml-6 cursor-pointer`}
            >
              {t('profile:remove')}
            </p>
          </div>
        </div>

        <div
          className={`w-screen flex flex-col justify-center items-center sm:hidden ${
            props.primaryEmail === props.email && 'hidden'
          }`}
        >
          <div className='flex flex-col w-r18 nm:w-r21 justify-center mt-10'>
            <div>
              <div className='w-full flex justify-between'>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white cursor-default break-all`}
                >
                  {props.email}
                </p>

                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white cursor-default opacity-0
                  `}
                >
                  .
                </p>
              </div>
            </div>
            <div className='mt-2'>
              <div className='w-full flex justify-between mt-4'>
                {!props.emailFullObj.email_verified_at && (
                  <div className='flex'>
                    <div
                      onMouseEnter={showWarning}
                      onMouseLeave={hideWarning}
                      className='flex justify-center items-center'
                    >
                      {!props.emailFullObj.email_verified_at && <WarningIcon />}
                    </div>

                    {!props.emailFullObj.email_verified_at && (
                      <Link
                        href='https://mail.google.com'
                        passHref
                        className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm italic text-warningOrange ml-2`}
                      >
                        {t('profile:notVerified')}
                      </Link>
                    )}
                  </div>
                )}

                {props.emailFullObj.email_verified_at && (
                  <div
                    onClick={makeEmailPrimary}
                    className='border border-sm w-44 h-9 rounded-md flex justify-center items-center cursor-pointer'
                  >
                    <p
                      className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white cursor-pointer`}
                    >
                      {t('profile:makeThisPrimary')}
                    </p>
                  </div>
                )}

                <p
                  onClick={removeEmail}
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-smoothGrayText cursor-pointer flex items-center`}
                >
                  {t('profile:remove')}
                </p>
              </div>
            </div>
          </div>

          <div className='w-r18 nm:w-r21 h-0.1 bg-grayLine mt-6'></div>
        </div>
      </div>
    </>
  )
}
export default EmailLayout
