import { useUserPageMainLayout } from './useUserPageMainLayout'
import Image from 'next/image'
import { movieQuotes } from 'public'
import { DownArrow, HomeSvg, VideoSvg } from 'components'
import Link from 'next/link'
import React from 'react'
import { UserPageProps } from './types'

const UserPageMainLayout: React.FC<UserPageProps> = (props) => {
  const {
    locale,
    t,
    closeDropdownOnBlur,
    dropdownSwitcher,
    isActiveDropdown,
    currentUserImageUrl,
    userName,
  } = useUserPageMainLayout()
  return (
    <>
      <div
        className={`h-screen w-full absolute z-10 bg-transparent ${
          !isActiveDropdown && 'hidden'
        } `}
        onClick={closeDropdownOnBlur}
      ></div>
      <div className='min-h-screen w-screen bg-layoutBackground overflow-x-hidden'>
        <header
          className='w-full fixed h-20 z-20 bg-blackBlue border border-borderBlackBlue text-white flex items-center justify-center'
          onClick={closeDropdownOnBlur}
        >
          <div className='flex justify-between items-center w-sw93 h-20'>
            <Image src={movieQuotes} alt='movie quotes' />

            <div className='flex'>
              <div
                className={`flex w-56 sm:justify-between justify-end items-center`}
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
                    className={`h-20 w-20 bg-purple-900/20 backdrop-blur absolute top-16 border flex flex-col items-center justify-center ${
                      !isActiveDropdown && 'hidden'
                    }`}
                  >
                    <div className='w-16 h-10 flex flex-col justify-center items-center'>
                      <Link
                        href='/profile'
                        locale='en'
                        className={`w-full h-full flex justify-center items-center font-helveticaEn`}
                      >
                        Eng
                      </Link>
                    </div>

                    <div className='w-16 h-10 flex border-t justify-center items-center'>
                      <Link
                        href='/profile'
                        locale={`${locale === 'en' ? 'ka' : 'en'}`}
                        className={`w-full h-full flex justify-center items-center font-helveticaKa`}
                      >
                        ქარ
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  className='bg-transparent h-10 w-32 flex justify-center items-center rounded-md border cursor-pointer'
                  href='?stage=login'
                  passHref
                >
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base`}
                  >
                    {t('common:logOut')}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className='flex mt-28'>
          <div className='flex flex-col justify-start items-center w-96 h-96 ml-14'>
            <div className='flex justify-start items-center w-96 h-20'>
              {currentUserImageUrl && (
                <Image
                  priority={true}
                  unoptimized={true}
                  className='w-16 h-16 rounded-full object-fill border border-2 border-profileImageBorderRed'
                  height={100}
                  width={100}
                  loader={() => currentUserImageUrl}
                  src={currentUserImageUrl}
                  alt={'user image'}
                />
              )}
              <div className='ml-6'>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {userName && userName}
                </p>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-smoothGray mt-2`}
                >
                  {t('profile:editProfile')}
                </p>
              </div>
            </div>
            <div className='flex justify-start items-center w-96 h-20'>
              <div className='w-16 h-16 flex justify-center items-center'>
                <HomeSvg />
              </div>
              <div className='ml-6'>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {t('profile:newsFeed')}
                </p>
              </div>
            </div>
            <div className='flex justify-start items-center w-96 h-20'>
              <div className='w-16 h-16 flex justify-center items-center'>
                <VideoSvg />
              </div>
              <div className='ml-6'>
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {t('profile:listOfMovies')}
                </p>
              </div>
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  )
}
export default UserPageMainLayout
