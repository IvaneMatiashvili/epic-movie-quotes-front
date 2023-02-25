import { useWriteNewPost } from './useWriteNewPost'
import {
  PhotoIcon,
  WhiteCloseIcon,
  MoviesInputError,
  MoviesTextarea,
  VideoSvg,
  OpenMovieListIcon,
} from 'components'
import { FormProvider } from 'react-hook-form'
import { checkTypeAndError } from 'helpers'
import React from 'react'
import Image from 'next/image'
import { WriteNewProps } from './types'
import Link from 'next/link'

const WriteNewPost: React.FC<WriteNewProps> = (props) => {
  const {
    locale,
    t,
    currentUserImageUrl,
    form,
    userName,
    errors,
    register,
    getImageValue,
    imageName,
    isUndefinedImageError,
    handleSubmit,
    storeNewQuote,
    movies,
    isUndefinedMoviesError,
    chooseMovie,
    openDropdown,
    closeDropdown,
    isOpenDropdown,
    selectedMovie,
    hasBorder,
    movieTextareaValidation,
  } = useWriteNewPost(props.setIsNewQuoteCreated, props.closeWriteNewQuoteModal)

  return (
    <div
      className={
        'fixed w-screen lg:w-[60.063rem] h-[48.5rem] inset-x-0 mx-auto top-0 lg:top-24 bg-blackBlueSoft z-50 lg:z-30 lgPlus:rounded-xl flex flex-col items-center'
      }
    >
      {isOpenDropdown && (
        <div
          onClick={closeDropdown}
          className={
            'w-screen sm:w-[60.063rem] bg-transparent fixed z-30 h-[48.5rem]'
          }
        ></div>
      )}
      <div className={`flex w-full justify-center items-center mt-8`}>
        <p
          className={`font-light text-xl text-white ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('newsFeed:writeNewQuote')}
        </p>

        <div
          onClick={props.closeWriteNewQuoteModal}
          className={`absolute ml-72 lg:ml-[55rem] flex items-center justify-center mt-1 cursor-pointer`}
        >
          <WhiteCloseIcon />
        </div>
      </div>

      <div
        className={`w-full h-0.1 bg-whiteGraySoftLine mt-8 rounded-xl`}
      ></div>

      <div
        className={`flex w-r19 nm:w-[22.375rem] lg:w-r55 justify-start items-center mt-[1.875rem]`}
      >
        {currentUserImageUrl && (
          <Image
            priority={true}
            unoptimized={true}
            className='w-16 h-16 rounded-full object-fill'
            height={100}
            width={100}
            loader={() => currentUserImageUrl}
            src={currentUserImageUrl}
            alt={'user image'}
          />
        )}
        <p
          className={`font-normal text-lg text-white ml-4 ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {userName && userName}
        </p>
      </div>

      <div className={`flex flex-col justify-center items-center w-full`}>
        <FormProvider {...form}>
          <form className={`mt-4`} onSubmit={handleSubmit(storeNewQuote)}>
            <div className={`flex flex-col`}>
              <MoviesTextarea
                id={'quote_en'}
                errors={{
                  ...movieTextareaValidation,
                  pattern: {
                    value: /^[a-zA-Z0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                    message: t('errors:onlyEnglishLetters'),
                  },
                }}
                name={'quote_en'}
                placeholder={'"Quote in English."'}
                key={'quote_en'}
                isEnglish={true}
                error={errors.quote_en}
              />

              <MoviesInputError errors={errors} name='quote_en' />

              <MoviesTextarea
                id={'quote_ka'}
                errors={{
                  ...movieTextareaValidation,
                  pattern: {
                    value: /^[ა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                    message: t('errors:onlyGeorgianLetters'),
                  },
                }}
                name={'quote_ka'}
                placeholder={'“ციტატა ქართულ ენაზე”'}
                key={'quote_ka'}
                isEnglish={false}
                error={errors.quote_ka}
              />

              <MoviesInputError errors={errors} name='quote_ka' />

              <div
                className={`
                font-normal rounded-md text-lg bg-transparent  w-r19 nm:w-[22.375rem] lg:w-r55 h-r055 outline-none mt-6 flex justify-start items-center
                `}
              >
                <input
                  type='file'
                  id='uploadImage'
                  {...register('image', {
                    required: t('errors:fieldIsRequired')!,
                  })}
                  multiple
                  onChange={getImageValue}
                  accept='image/*'
                  title=' '
                  className={` absolute
                border border-borderGraySoft 
                font-normal rounded-md text-lg bg-transparent  w-r19 nm:w-[22.375rem] lg:w-r55 h-r055 outline-none cursor-pointer z-10
                 ${checkTypeAndError({
                   error: errors.image,
                   isUndefinedError: isUndefinedImageError,
                   forMovieOrNewsFeedPage: true,
                 })}
                `}
                ></input>

                <div className='ml-4'>
                  <PhotoIcon />
                </div>

                <p
                  className={`font-light text-base text-white ml-4 hidden lg:block ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {t('movies:dragAndDrop')}
                </p>

                <p
                  className={`font-light text-xs nm:text-base text-white w-40 ml-4 lg:hidden ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {t('movies:uploadImage')}
                </p>

                <div className='flex bg-chooseFile items-center justify-center w-36 h-10 rounded-sm ml-4'>
                  <p
                    className={`font-light text-xs nm:text-sm lg:text-base text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {t('movies:chooseFile')}
                  </p>
                </div>
                <p
                  className={`font-light text-base text-white font-helveticaKa ml-4 hidden lg:block
                  `}
                >
                  {imageName}
                </p>
                <p
                  className={`font-light text-base text-white font-helveticaKa ml-4 lg:hidden
                  `}
                >
                  {''}
                </p>
              </div>

              <p
                className={`font-light text-sm text-white font-helveticaKa lg:hidden
                  `}
              >
                {imageName}
              </p>

              <MoviesInputError errors={errors} name='image' />
            </div>

            {movies.length === 0 && (
              <Link
                href={'/movies?stage=addMovie'}
                locale={locale}
                passHref
                className={`w-r19 nm:w-[22.375rem] lg:w-r55 mt-7 flex items-center`}
              >
                <p
                  className={`font-normal text-lg text-white ml-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }
                  `}
                >
                  {t('newsFeed:moviesListEmpty')}
                </p>

                <div className='flex bg-chooseFile items-center justify-center w-36 h-10 rounded-sm ml-4'>
                  <p
                    className={`font-light text-xs nm:text-sm lg:text-base text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {t('newsFeed:createMovie')}
                  </p>
                </div>
              </Link>
            )}

            {movies.length > 0 && (
              <div
                onClick={openDropdown}
                className={`bg-black h-[5.375rem]  w-r19 nm:w-[22.375rem] lg:w-r55 mt-7 rounded-md flex items-center justify-between cursor-pointer
              
                  ${hasBorder && 'border'}
                  ${checkTypeAndError({
                    error: errors.movie,
                    isUndefinedError: isUndefinedMoviesError,
                    forMovieOrNewsFeedPage: true,
                  })}
                  
              `}
              >
                <div className={`flex item-center min-h-2 ml-6`}>
                  <div className={`relative bottom-1`}>
                    <VideoSvg />
                  </div>
                  <p
                    className={`font-normal text-xl text-white font-helveticaKa ml-3
                  `}
                  >
                    {Object.keys(selectedMovie).length < 1 &&
                      t('newsFeed:chooseMovie')}
                    {Object.keys(selectedMovie).length > 0 &&
                      (locale === 'en'
                        ? selectedMovie?.title?.en
                        : selectedMovie?.title?.ka)}
                  </p>
                </div>
                <div className={`mr-5`}>
                  <OpenMovieListIcon />
                </div>
              </div>
            )}

            {isOpenDropdown && movies && (
              <>
                <div
                  className={`absolute bg-dropdownBackground w-r19 nm:w-[22.375rem] lg:w-r55 h-28 overflow-y-scroll rounded-md z-40`}
                ></div>
                <div
                  className={`absolute bg-borderBlackBlue/60 backdrop-blur-xl w-r19 nm:w-[22.375rem] lg:w-r55 h-28 overflow-y-scroll rounded-md z-40`}
                >
                  {movies.map((el, inx) => (
                    <div
                      key={el?.id! + inx}
                      onClick={() => chooseMovie(el)}
                      className={`h-8 flex items-center cursor-pointer z-40 hover:bg-dropdownHover`}
                    >
                      {
                        <p
                          className={`font-normal text-base text-white font-helveticaKa ml-4`}
                        >
                          {locale === 'en' ? el?.title?.en : el?.title?.ka}
                        </p>
                      }
                    </div>
                  ))}
                </div>
              </>
            )}
            <input
              id='genres'
              {...register('movie', {
                required: t('errors:fieldIsRequired')!,
              })}
              className={`hidden
                `}
            ></input>

            <MoviesInputError errors={errors} name='movie' />

            <button
              type='submit'
              className={`bg-signInRed h-r027  w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-center 
                items-center rounded-md mt-10 cursor-pointer mb-12`}
            >
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
              >
                {t('newsFeed:post')}
              </p>
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default WriteNewPost
