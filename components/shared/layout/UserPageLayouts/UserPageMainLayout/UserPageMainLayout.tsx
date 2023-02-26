import { useUserPageMainLayout } from './useUserPageMainLayout'
import Image from 'next/image'
import { movieQuotes } from 'public'
import {
  BlackUpArrowIcon,
  CommentsAndLikesNotification,
  DownArrow,
  HomeIconSmall,
  HomeSvg,
  LoadingSpinner,
  NavigationMenu,
  NotificationIconSmall,
  NotificationWhiteIcon,
  SearchMobileIcon,
  VideoIconSmall,
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
    closeMobileSearch,
    openMobileSearch,
    openMobileMenu,
    isOpenMobileMenu,
    closeMobileMenu,
    logOutUser,
    newNotifications,
  } = useUserPageMainLayout(
    props.setIsSetBackground,
    props.setIsSearchMobileOpen,
    props.setIsSearchOpen,
    props.setIsWriteNewQuoteModalOpen
  )

  return (
    <>
      <div
        className={`min-h-screen w-full fixed z-10 bg-transparent ${
          !isActiveDropdown && 'hidden'
        } `}
        onClick={closeDropdownOnBlur}
      ></div>
      <div
        className={`min-h-screen w-full fixed z-40 bg-transparent lg:hidden ${
          !props.isSearchMobileOpen && 'hidden'
        } `}
        onClick={closeMobileSearch}
      ></div>
      <div
        className={`min-h-screen w-full fixed z-40 bg-transparent lgPlus:hidden ${
          !isOpenMobileMenu && 'hidden'
        } `}
        onClick={closeMobileMenu}
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
          className='w-full fixed  h-[5.375rem] z-50 bg-blackBlue border border-borderBlackBlue text-white flex items-center justify-center'
          onClick={closeDropdownOnBlur}
        >
          <div className='flex justify-between items-center w-sw93 h-20'>
            <div className={`hidden lgPlus:block`}>
              <Image src={movieQuotes} alt='movie quotes' />
            </div>
            <div
              onClick={openMobileMenu}
              className={`lgPlus:hidden cursor-pointer`}
            >
              <NavigationMenu />
            </div>

            <div className='flex justify-end'>
              <div
                className={`flex w-[4.5rem] lgPlus:w-72 justify-between items-center mr-[2.906rem] lgPlus:mr-0`}
              >
                {pathname.split('/')[1] === 'news-feed' && (
                  <div
                    onClick={openMobileSearch}
                    className={`lgPlus:hidden cursor-pointer  `}
                  >
                    <SearchMobileIcon />
                  </div>
                )}

                {pathname.split('/')[1] !== 'news-feed' && (
                  <div className={`lgPlus:hidden opacity-0`}>
                    <SearchMobileIcon />
                  </div>
                )}
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
                    <div className={`hidden lgPlus:block`}>
                      <NotificationWhiteIcon />
                    </div>

                    <div className={`lgPlus:hidden`}>
                      <NotificationIconSmall />
                    </div>
                  </div>

                  {isNotificationsModalOpen && (
                    <>
                      <div
                        className={`fixed w-screen h-screen bg-transparent inset-0 mx-auto z-40`}
                        onClick={closeNotificationsModal}
                      ></div>

                      <div className={`absolute mt-20 lg:mt-24 z-40`}>
                        <BlackUpArrowIcon />
                      </div>

                      <div
                        id='scrollableDiv'
                        className={`absolute z-50 w-screen overflow-hidden lg:w-[60.063rem] h-[50.75rem] bg-black inset-x-0 mx-auto lg:mx-0 lg:inset-x-auto lg:mr-[50rem] lgPlus:mr-[32rem] mt-[56.1rem] lg:mt-[57rem] rounded-md flex flex-col items-center overflow-y-scroll`}
                      >
                        <div
                          className={
                            'w-[20rem] nm:w-[22.375rem] lg:w-[56.063rem] flex justify-between mt-10'
                          }
                        >
                          <p
                            className={`text-white ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            } font-normal text-lg lg:text-2xl`}
                          >
                            {t('common:notifications')}
                          </p>
                          <p
                            onClick={removeNotificationsOnClick}
                            className={`text-white underline decoration-2 decoration-borderGraySoft cursor-pointer ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            } font-normal text-sm lg:text-lg`}
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
                                newNotifications={newNotifications}
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
                  className={`lgPlus:flex hidden items-center cursor-pointer relative z-50`}
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

                <div
                  onClick={logOutUser}
                  className='bg-transparent h-10 w-32 hidden lgPlus:flex justify-center items-center rounded-md border cursor-pointer relative z-50'
                >
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base`}
                  >
                    {t('common:logOut')}
                  </p>
                </div>
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
              className='flex justify-start items-center w-72 h-20 relative z-50'
            >
              {currentUserImageUrl && (
                <Image
                  priority={true}
                  unoptimized={true}
                  className={`w-16 h-16 rounded-full object-fill ${
                    pathname.split('/')[1] === 'profile' &&
                    'border border-2 border-profileImageBorderRed'
                  }`}
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

          {isOpenMobileMenu && (
            <div className='flex flex-col justify-start items-start fixed z-50 w-[18rem] nm:w-[23.875rem] sm:w-[50rem] h-[41.125rem] top-0 lgPlus:hidden bg-passwordWarningBg'>
              <div className={`mt-[3.125rem]`}></div>
              <Link
                href='/profile'
                locale={locale}
                passHref={true}
                className='flex justify-start items-center w-72 h-20 relative z-50 ml-4 nm:ml-[2.813rem]'
              >
                {currentUserImageUrl && (
                  <Image
                    priority={true}
                    unoptimized={true}
                    className={`w-14 h-14 rounded-full object-fill
                   ${
                     pathname.split('/')[1] === 'profile' &&
                     'border border-2 border-profileImageBorderRed'
                   } 
                    `}
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
                  } font-normal text-lg text-white`}
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
                className='flex justify-start items-center w-72 h-20 z-40 ml-4 nm:ml-[2.813rem]'
              >
                <div className='w-14 h-14 flex justify-center items-center'>
                  <HomeIconSmall />
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
                passHref
                className='flex justify-start items-center w-72 h-20 z-40 ml-4 nm:ml-[2.813rem]'
              >
                <div className='w-14 h-14 flex justify-center items-center'>
                  <VideoIconSmall />
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

              <div
                onClick={logOutUser}
                className='bg-transparent h-10 w-32 flex justify-center items-center mt-72 rounded-md border cursor-pointer relative z-50 mx-auto'
              >
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {t('common:logOut')}
                </p>
              </div>
            </div>
          )}

          <div className={'w-screen flex justify-center items-center'}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
export default UserPageMainLayout
