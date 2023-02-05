import React from 'react'
import { useButtonAndCancelMobile } from './useButtonAndCancelMobile'
import { ButtonAndCancelMobileProps } from './types'
import { LoadingSpinner } from '../../svg'

const ButtonAndCancelMobile: React.FC<ButtonAndCancelMobileProps> = (props) => {
  const { t, locale, hideModal } = useButtonAndCancelMobile(
    props.setIsSubmitFormOpen
  )
  return (
    <>
      <div
        onClick={hideModal}
        className={`absolute sm:hidden bg-blackDarkLinear backdrop-blur-xs w-screen h-screen top-0 z-40`}
      ></div>
      <div className={`flex w-screen justify-center item-center`}>
        <div className='sm:hidden flex flex-col w-r21 h-52 item-center mt-32 relative z-50 bg-blackDarkGrayLinear backdrop-blur-xl rounded-lg'>
          <p
            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-light text-sm text-white flex justify-center mt-16`}
          >
            {t('profile:areYouSure')}
          </p>

          <div className='bg-grayLineSoft w-full h-0.1 mt-12'></div>

          <div className='w-full flex justify-around mt-4'>
            <p
              onClick={hideModal}
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white  h-9 flex items-center cursor-pointer mr-20 `}
            >
              {t('profile:cancel')}
            </p>
            <button
              type='submit'
              className={`bg-signInRed h-9 ${
                locale === 'en' ? 'w-20' : 'w-28'
              } ml-4 flex justify-center items-center rounded-md cursor-pointer`}
            >
              {!props.isLoading && (
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white`}
                >
                  {t('profile:confirm')}
                </p>
              )}
              {props.isLoading && (
                <div className={'ml-2'}>
                  <LoadingSpinner />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ButtonAndCancelMobile
