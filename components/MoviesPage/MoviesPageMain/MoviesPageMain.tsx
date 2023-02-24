import {
  AddNewEmailIcon,
  QuoteIcon,
  SearchIcon,
  UserPageMainLayout,
} from 'components'
import React from 'react'
import Link from 'next/link'
import { useMoviesPageMain } from './useMoviesPageMain'
import { AddNewMovie } from '../AddNewMovie'
import Image, { ImageLoader } from 'next/image'
import { Movies } from 'types'

const MoviesPageMain = () => {
  const {
    t,
    locale,
    isAddMoviesFormOpen,
    stage,
    moviesQuantity,
    movies,
    searchMovieOnChange,
    inputReference,
    edit,
    inputValue,
  } = useMoviesPageMain()

  return (
    <UserPageMainLayout>
      <div
        className={`w-screen ${
          stage === 'addMovie' && 'min-h-r75'
        } mt-28 sm:mt-0 flex flex-col items-center justify-center lg:ml-[20rem]`}
      >
        <div
          className={
            'w-[19rem] nm:w-[22.375rem] sm:w-screen lg:w-[40rem] mdLg:w-[60rem] xlPlus:w-[92rem] flex justify-between sm:justify-around mdLg:justify-between items-center'
          }
        >
          <p
            className={`font-light text-sm lg:text-2xl text-white brake-words w-40 lg:w-96 ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            }`}
          >
            {`${t('movies:myListOfMovies')} (${t('movies:total')} ${
              moviesQuantity && moviesQuantity
            })`}
          </p>

          <div className={'flex items-center justify-center'}>
            <div className={'hidden mdLg:flex items-center justify-center'}>
              {stage !== 'search' && (
                <Link
                  href={'/movies?stage=search'}
                  locale={locale}
                  className={'flex items-center'}
                >
                  <SearchIcon />
                  <p
                    className={`font-light text-base text-white ml-4 ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {t('movies:search')}
                  </p>
                </Link>
              )}

              {stage === 'search' && (
                <div
                  className={`hidden sm:flex flex-col items-center sm:w-60 xlPlus:w-[43rem] justify-center absolute ml-[-45rem] search-animation z-40`}
                >
                  <div
                    className={`flex items-center  justify-between sm:w-16 xlPlus:w-[43rem]`}
                  >
                    <button type='submit'>
                      <SearchIcon />
                    </button>
                    <input
                      id={'search-movies'}
                      placeholder={t('movies:searchMovies')!}
                      name={'search'}
                      onChange={searchMovieOnChange}
                      ref={inputReference}
                      defaultValue={inputValue}
                      className={`
                        font-helveticaKa placeholder-borderGraySoft text-white placeholder-4 placeholder-base movies-input border-0 ml-4
                        font-normal rounded-md text-lg bg-transparent w-[40.5rem] h-8 outline-none pr-8 xlPlus:pr-1
                    `}
                    />
                  </div>
                  <div
                    className={
                      'w-64 xlPlus:w-[43rem] h-0.1 bg-whiteGraySoftLine mt-4'
                    }
                  ></div>
                </div>
              )}
            </div>
            <Link
              href={'/movies?stage=addMovie'}
              locale={locale}
              passHref
              className={`flex justify-center items-center ml-8 ${
                locale === 'en' ? 'w-[7.938rem] sm:w-40' : 'w-[9.2rem] sm:w-48'
              } h-[2.375rem] sm:h-12 rounded-md bg-borderRed`}
            >
              <AddNewEmailIcon />
              <p
                className={`font-light text-sm sm:text-base text-white ml-2 ${
                  locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                }`}
              >
                {t('movies:addMovie')}
              </p>
            </Link>
          </div>
        </div>

        {isAddMoviesFormOpen && <AddNewMovie />}
        {movies.length > 0 && (
          <div
            className={`w-[19rem] nm:w-[22.375rem] sm:w-screen lg:w-[40rem] mdLg:w-[62rem] xlPlus:w-[92rem] min-h-2 flex sm:justify-center mdLg:justify-start mt-16 flex-wrap gap-[5rem] xlPlus:gap-[4.75rem] ${
              (stage === 'addMovie' || edit) && 'hidden lgPlus:flex'
            }`}
          >
            {movies.map((el: Movies, inx) => (
              <Link
                key={el.title?.en! + el.id + inx}
                className={`flex flex-col justify-center cursor-pointer`}
                href={`/movies/${el.id}`}
                passHref
                locale={locale}
              >
                <div className='flex flex-col items-center justify-start justify-self-start self-start'>
                  {el.thumbnail && (
                    <Image
                      priority={true}
                      unoptimized={true}
                      className='w-[19rem] nm:w-[22.375rem] h-[18.875rem] sm:w-[27.5rem] sm:h-[23.2rem] rounded-xl object-fill'
                      height={100}
                      width={100}
                      loader={(() => el.thumbnail) as ImageLoader}
                      src={el.thumbnail}
                      alt={'movie thumbnail'}
                    />
                  )}
                </div>
                <p
                  className={`font-light text-2xl text-white uppercase mt-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {`${
                    locale === 'en' ? el.title?.en : el.title?.ka
                  } (${el.release_date?.slice(0, 4)})`}
                </p>

                <div className={'flex mt-6 items-center'}>
                  <p
                    className={`font-light text-xl text-white uppercase mr-4 font-helveticaEn
                  `}
                  >
                    {el?.quotes?.length}
                  </p>
                  <QuoteIcon />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className={'w-2 h-2 mb-10'}></div>
        <div className={` ${stage === 'addMovie' && 'h-r75'}`}></div>
      </div>
    </UserPageMainLayout>
  )
}

export default MoviesPageMain
