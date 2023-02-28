import { useNewsFeedMain } from './useNewsFeedMain'
import {
  LeftArrowWhiteIcon,
  LoadingSpinner,
  SearchIcon,
  UserPageMainLayout,
  WriteNewQuoteIcon,
} from 'components'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserQuote } from '../UserQuote'
import WriteNewPost from '../WriteNewPost/WriteNewPost'

const NewsFeedMain = () => {
  const {
    getUserQuotes,
    userQuotes,
    t,
    locale,
    hasMoreItems,
    page,
    movies,
    searchMovieOnChange,
    inputReference,
    openSearch,
    closeSearch,
    isSearchOpen,
    inputValue,
    isWriteNewQuoteModalOpen,
    openWriteNewQuoteModal,
    closeWriteNewQuoteModal,
    setIsNewQuoteCreated,
    isSearchMobileOpen,
    setIsSearchMobileOpen,
    closeSearchMobile,
    setIsSearchOpen,
    setIsWriteNewQuoteModalOpen,
  } = useNewsFeedMain()

  return (
    <UserPageMainLayout
      setIsSearchMobileOpen={setIsSearchMobileOpen}
      isSearchMobileOpen={isSearchMobileOpen}
      setIsSearchOpen={setIsSearchOpen}
      setIsWriteNewQuoteModalOpen={setIsWriteNewQuoteModalOpen}
    >
      <div
        id={'newsFeedMainScrollBar'}
        className={
          'min-h-full overflow-hidden w-screen flex flex-col items-center sm:mt-0 ml-0 lgPlus:ml-40 xlPlus:ml-0'
        }
      >
        {isSearchMobileOpen && (
          <div
            className={`w-screen h-[48.375rem] fixed z-50 top-0  bg-searchMobileBg lgPlus:hidden `}
          >
            <div className={'flex items-center mt-6'}>
              <div
                onClick={closeSearchMobile}
                className={`ml-8 cursor-pointer`}
              >
                <LeftArrowWhiteIcon />
              </div>

              <input
                id={'search-movies'}
                placeholder={t('newsFeed:search')!}
                name={'search'}
                onChange={searchMovieOnChange}
                ref={inputReference}
                defaultValue={inputValue}
                className={`
                        font-helveticaKa placeholder-borderGraySoft text-white placeholder-4 placeholder-base movies-input border-0 ml-8
                        font-normal rounded-md text-lg bg-transparent min-w-2 h-8 outline-none pr-8 xlPlus:pr-1
                    `}
              />
            </div>

            <div
              className={`w-screen h-0.1 bg-inputLineGray mt-[1.188rem]`}
            ></div>

            <p
              className={`font-normal text-base text-borderGraySoft mt-[1.625rem] ml-20 ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              }`}
            >
              {t('newsFeed:enter@')}
            </p>

            <p
              className={`font-normal text-base text-borderGraySoft mt-[1.375rem] ml-20 ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              }`}
            >
              {t('newsFeed:enter#')}
            </p>
          </div>
        )}
        <div className={`w-[58.625rem] flex justify-between items-center mt-4`}>
          {isWriteNewQuoteModalOpen && (
            <div
              onClick={closeWriteNewQuoteModal}
              className={`fixed w-screen h-screen z-30 bg-blueSoftBlurBg blur opacity-70 inset-0 mx-auto`}
            ></div>
          )}
          {isWriteNewQuoteModalOpen && (
            <WriteNewPost
              closeWriteNewQuoteModal={closeWriteNewQuoteModal}
              setIsNewQuoteCreated={setIsNewQuoteCreated}
            />
          )}
          <div
            onClick={openWriteNewQuoteModal}
            className={`${
              !isSearchOpen
                ? 'w-screen lgPlus:w-[48rem]'
                : `${
                    locale === 'en'
                      ? 'w-screen lgPlus:w-[13.625rem]'
                      : 'w-screen lgPlus:w-[14.5rem]'
                  }`
            } h-[6.8rem] lg:h-[3.25rem] mt-[14.8rem] sm:mt-3 lg:mt-0 rounded-md bg-transparent lg:bg-deleteOrEdit flex items-center cursor-pointer absolute inset-x-0 mx-auto lg:inset-x-auto  lg:mx-0 lg:relative z-20 `}
          >
            <div className={`ml-4`}>
              <WriteNewQuoteIcon />
            </div>

            <p
              className={`font-normal text-base text-white ml-4 ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              }`}
            >
              {t('newsFeed:writeNewQuote')}
            </p>
          </div>

          {isSearchOpen && (
            <div
              onClick={closeSearch}
              className={`fixed w-screen h-screen z-10 bg-transparent inset-0 mx-auto hidden lgPlus:block`}
            ></div>
          )}

          <div
            className={
              'hidden lgPlus:flex items-center justify-center cursor-pointer'
            }
          >
            {!isSearchOpen && (
              <div
                onClick={openSearch}
                className={`flex items-center ${locale === 'ka' && 'mr-14'}`}
              >
                <SearchIcon />
                <p
                  className={`font-light text-base text-smoothGrayText ml-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {t('newsFeed:searchBy')}
                </p>
              </div>
            )}

            {isSearchOpen && (
              <div
                className={`flex flex-col items-center w-60 lgPlus:w-[43rem] justify-center ml-[-45rem] search-animation z-20`}
              >
                <div
                  className={`flex items-center justify-between ${
                    locale === 'en'
                      ? 'sm:w-16 lgPlus:w-[41.75rem]'
                      : 'sm:w-16 lgPlus:w-[39.75rem]'
                  }`}
                >
                  <button type='submit'>
                    <SearchIcon />
                  </button>
                  <input
                    id={'search-movies'}
                    placeholder={t('newsFeed:searchMovieQuote')!}
                    name={'search'}
                    onChange={searchMovieOnChange}
                    ref={inputReference}
                    defaultValue={inputValue}
                    className={`
                        font-helveticaKa placeholder-borderGraySoft text-white placeholder-4 placeholder-base search-movies-input border-0 ml-4
                        font-normal rounded-md text-lg bg-transparent w-[40.5rem] h-8 outline-none pr-8 xlPlus:pr-1
                    `}
                  />
                </div>
                <div
                  className={`${
                    locale === 'en'
                      ? 'w-64 lgPlus:w-[43rem] ml-6'
                      : 'w-64 lgPlus:w-[42rem] ml-10'
                  } h-0.1 absolute bg-whiteGraySoftLine mt-16`}
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className={`mt-[8.7rem] sm:mt-7 lgPlus:mt-0`}></div>
        <InfiniteScroll
          dataLength={userQuotes?.length}
          next={getUserQuotes}
          hasMore={hasMoreItems}
          scrollableTarget={'newsFeedMainScrollBar'}
          loader={
            <div className={`mt-4`}>
              <LoadingSpinner />
            </div>
          }
          style={{ overflow: 'hidden !important' }}
        >
          {userQuotes?.length > 0 &&
            userQuotes?.map(
              (quote, inx) =>
                quote?.id && (
                  <UserQuote
                    key={`${quote.id!} + ${inx}`}
                    userQuote={quote}
                    page={page}
                    movie={movies.filter((el) => el.id === quote.movie_id)[0]}
                    quoteUserId={
                      movies.filter((el) => el.id === quote.movie_id)[0]
                        .user_id!
                    }
                  />
                )
            )}
        </InfiniteScroll>
      </div>
    </UserPageMainLayout>
  )
}

export default NewsFeedMain
