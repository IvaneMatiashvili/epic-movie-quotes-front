import { DownArrow } from 'components'
import Link from 'next/link'
import { useNavBar } from './useNavBar'
import React from 'react'
import { PropsType } from './types'
import Image from 'next/image'
import movieQuotes from '/public/assets/movie-quotes.png'

const NavBar: React.FC<PropsType> = (props) => {
  const {
    locale,
    t,
    closeDropdownOnBlur,
    dropdownSwitcher,
    isActiveDropdown,
    removeScrollbarAndOpenRegisterForm,
  } = useNavBar()
  return (
    <>
      <div
        className={`h-sh375 w-full absolute z-10 bg-transparent ${
          !isActiveDropdown && 'hidden'
        } `}
        onClick={closeDropdownOnBlur}
      ></div>

      <header
        className='w-full fixed h-20 z-20 bg-softBlack text-white flex items-center justify-center'
        onClick={closeDropdownOnBlur}
      >
        <div className='flex justify-between items-center w-sw93 h-20'>
          <Image src={movieQuotes} alt='movie quotes' />

          <div className='flex'>
            <div
              className={`flex sm:w-r23 w-40 sm:justify-between justify-end items-center`}
            >
              <div
                className={`sm:flex hidden items-center cursor-pointer`}
                onClick={dropdownSwitcher}
              >
                <p
                  className={`text-white mr-2 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base`}
                >
                  {locale === 'en' ? 'Eng' : 'ქარ'}
                </p>

                <DownArrow />

                <div
                  className={`h-20 w-20 bg-softBlack absolute top-16 border flex flex-col items-center justify-center ${
                    !isActiveDropdown && 'hidden'
                  }`}
                >
                  <div className='w-16 h-10 flex flex-col justify-center items-center'>
                    <Link
                      href='/'
                      locale='en'
                      className={`w-full h-full flex justify-center items-center font-helveticaEn`}
                    >
                      Eng
                    </Link>
                  </div>

                  <div className='w-16 h-10 flex border-t justify-center items-center'>
                    <Link
                      href='/'
                      locale={`${locale === 'en' ? 'ka' : 'en'}`}
                      className={`w-full h-full flex justify-center items-center font-helveticaKa`}
                    >
                      ქარ
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className='bg-signInRed h-10 w-32 sm:flex hidden justify-center items-center rounded-md cursor-pointer'
                onClick={() =>
                  removeScrollbarAndOpenRegisterForm(
                    props.setHasScrollBar,
                    props.setIsRegisterOn
                  )
                }
              >
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base`}
                >
                  {t('home:signUp')}
                </p>
              </div>

              <div className='bg-softBlack h-10 w-32 flex justify-center items-center rounded-md border'>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base`}
                >
                  {t('home:logIn')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='w-full h-sh75 bg-softBlack bg-fixed z-10 flex justify-center items-center flex-col'>
        <div className='flex justify-center items-center flex-col mt-28'>
          <p
            className={`${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            } font-bold sm:text-5xl text-2xl text-softBrown`}
          >
            {t('home:findQuoteFirstLine')}
          </p>
          <p
            className={`${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            } font-bold sm:text-5xl text-2xl text-softBrown sm:mt-6 mt-2`}
          >
            {t('home:findQuoteSecondLine')}
          </p>
        </div>

        <div className='bg-signInRed h-10 w-32 flex justify-center items-center rounded-md mt-10'>
          <p
            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
          >
            {t('home:getStarted')}
          </p>
        </div>
      </div>
    </>
  )
}

export default NavBar
