import { useUserPageMainLayout } from './useUserPageMainLayout'
import Image from 'next/image'
import { movieQuotes } from 'public'
import {
  BlackUpArrowIcon,
  CommentsAndLikesNotification,
  DownArrow,
  HomeSvg,
  LoadingSpinner,
  NotificationWhiteIcon,
  VideoSvg,
} from 'components'
import Link from 'next/link'
import React from 'react'
import { UserPageProps } from './types'
import InfiniteScroll from 'react-infinite-scroll-component'

const UserPageMainLayout: React.FC<UserPageProps> = (props) => {
  const {
    locale,
    t,
    closeDropdownOnBlur,
    dropdownSwitcher,
    isActiveDropdown,
    currentUserImageUrl,
    userName,
    stage,
    asPath,
    pathname,
    movie,
    quote,
    edit,
    notifications,
    removeNotificationsOnClick,
    notificationsQuantity,
    openNotificationsModal,
    closeNotificationsModal,
    isNotificationsModalOpen,
    isNewGlobal,
    getQuoteNotifications,
    hasMoreItems,
    setNotificationsQuantity,
    loadDataOnlyOnce,
  } = useUserPageMainLayout(props.setIsSetBackground)
  return (
    <>
      <div
        className={`min-h-screen w-full fixed z-10 bg-transparent ${
          !isActiveDropdown && 'hidden'
        } `}
        onClick={closeDropdownOnBlur}
      ></div>

      <Link
        href={'/profile'}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-blueSoftBlurBg blur opacity-70 cursor-default ${
          (stage !== 'addEmail' || pathname !== '/profile') && 'hidden'
        }
        ${
          stage === 'addEmail' && pathname === '/profile' && ' hidden sm:block'
        } 
         `}
      ></Link>

      <Link
        href={'/movies'}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-blueSoftBlurBg blur opacity-70 cursor-default ${
          (stage !== 'addMovie' || pathname !== '/movies') && 'hidden'
        }
        ${stage === 'addMovie' && pathname === '/movies' && 'hidden sm:block'} 
         `}
      ></Link>

      <Link
        href={`/movies/${movie}`}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-blueSoftBlurBg blur opacity-70 cursor-default ${
          (stage !== 'addQuote' ||
            pathname.split('/')[1] !== 'movies' ||
            edit) &&
          'hidden'
        }
        ${
          (stage === 'addQuote' || edit) &&
          pathname.split('/')[1] === 'movies' &&
          'hidden sm:block'
        } 
         `}
      ></Link>

      <Link
        href={'/movies'}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-transparent blur opacity-70 cursor-default
                ${(stage !== 'search' || pathname !== '/movies') && 'hidden'}
        ${stage === 'search' && pathname === '/movies' && 'hidden sm:block'} 

         `}
      ></Link>

      <Link
        href={`/movies/${movie}`}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-transparent blur opacity-70 cursor-default
                ${(!quote || pathname.split('/')[1] === 'movies') && 'hidden'}
        ${quote && pathname.split('/')[1] === 'movies' && 'hidden sm:block'} 

         `}
      ></Link>

      <Link
        href={`/movies/${movie}/quote/${quote}`}
        locale={locale}
        className={`h-screen w-full fixed z-10 bg-transparent blur opacity-70 cursor-default
                ${
                  (!quote ||
                    pathname.split('/')[1] === 'movies' ||
                    stage !== 'editQuote') &&
                  'hidden'
                }
        ${
          quote &&
          pathname.split('/')[1] === 'movies' &&
          stage === 'editQuote' &&
          'hidden sm:block'
        } 

         `}
      ></Link>

      <div className='min-h-screen w-screen bg-layoutBackground overflow-x-hidden'>
        <header
          className='w-full fixed h-20 z-40 bg-blackBlue border border-borderBlackBlue text-white flex items-center justify-center'
          onClick={closeDropdownOnBlur}
        >
          <div className='flex justify-between items-center w-sw93 h-20'>
            <Image src={movieQuotes} alt='movie quotes' />

            <div className='flex'>
              <div className={`flex w-72 justify-between items-center`}>
                <div className={`flex justify-center items-center`}>
                  {notificationsQuantity > 0 && (
                    <div
                      onClick={openNotificationsModal}
                      className={`bg-notification w-[1.563rem] h-[1.563rem] cursor-pointer rounded-full absolute ml-[1.4rem] mb-[1rem] flex justify-center items-center`}
                    >
                      <p
                        className={`text-white font-normal text-sm font-helveticaEn`}
                      >
                        {notificationsQuantity}
                      </p>
                    </div>
                  )}
                  <div
                    onClick={openNotificationsModal}
                    className={`cursor-pointer`}
                  >
                    <NotificationWhiteIcon />
                  </div>

                  {isNotificationsModalOpen && (
                    <>
                      <div
                        className={`fixed w-screen h-screen bg-transparent inset-0 mx-auto z-40`}
                        onClick={closeNotificationsModal}
                      ></div>

                      <div className={`absolute mt-24 z-40`}>
                        <BlackUpArrowIcon />
                      </div>

                      <div
                        id='scrollableDiv'
                        className={`absolute z-50 w-[60.063rem] h-[50.75rem] bg-black mr-[32rem] mt-[57rem] rounded-md flex flex-col items-center overflow-y-scroll`}
                      >
                        <div
                          className={'w-[56.063rem] flex justify-between mt-10'}
                        >
                          <p
                            className={`text-white ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            } font-normal text-2xl`}
                          >
                            {t('common:notifications')}
                          </p>
                          <p
                            onClick={removeNotificationsOnClick}
                            className={`text-white underline decoration-2 decoration-borderGraySoft cursor-pointer ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            } font-normal text-lg`}
                          >
                            {t('common:markAsAllRead')}
                          </p>
                        </div>

                        <div className={`mt-[0.438rem]`}></div>

                        <InfiniteScroll
                          dataLength={notifications?.length}
                          next={getQuoteNotifications}
                          hasMore={hasMoreItems}
                          scrollableTarget='scrollableDiv'
                          loader={
                            <div className={`mt-4`}>
                              <LoadingSpinner />
                            </div>
                          }
                          style={{ overflow: 'hidden !important' }}
                        >
                          {notifications.length > 0 &&
                            notifications.map((comment, inx) => (
                              <CommentsAndLikesNotification
                                notification={comment}
                                isNewGlobal={isNewGlobal}
                                key={`${comment.id} ${inx}`}
                                setNotificationsQuantity={
                                  setNotificationsQuantity
                                }
                              />
                            ))}
                        </InfiniteScroll>
                        <div className={`h-20 w-1 mt-5`}></div>
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={`sm:flex hidden items-center cursor-pointer relative z-50`}
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
                        href={asPath}
                        locale='en'
                        className={`w-full h-full flex justify-center items-center font-helveticaEn`}
                      >
                        Eng
                      </Link>
                    </div>

                    <div className='w-16 h-10 flex border-t justify-center items-center'>
                      <Link
                        href={asPath}
                        locale={`ka`}
                        className={`w-full h-full flex justify-center items-center font-helveticaKa`}
                      >
                        ქარ
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  className='bg-transparent h-10 w-32 flex justify-center items-center rounded-md border cursor-pointer relative z-50'
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

        <div className='flex sm:mt-28'>
          <div className='hidden lgPlus:flex flex-col justify-start items-center fixed z-40 w-72 min-h-10 ml-14 mr-10'>
            <Link
              href='/profile'
              locale={locale}
              passHref={true}
              onLoad={loadDataOnlyOnce}
              className='flex justify-start items-center w-72 h-20 relative z-50'
            >
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
                  } font-normal text-xl text-white`}
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
            </Link>
            <Link
              href='/news-feed'
              locale={locale}
              passHref
              onLoad={loadDataOnlyOnce}
              className='flex justify-start items-center w-72 h-20 z-40'
            >
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
            </Link>
            <Link
              href='/movies'
              locale={locale}
              onLoad={loadDataOnlyOnce}
              passHref
              className='flex justify-start items-center w-72 h-20 z-40'
            >
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
            </Link>
          </div>
          <div className={'w-screen flex justify-center items-center'}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
export default UserPageMainLayout
