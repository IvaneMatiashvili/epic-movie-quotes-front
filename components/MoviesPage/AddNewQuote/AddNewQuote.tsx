import { useAddNewQuote } from './useAddNewQuote'
import React from 'react'
import {
  MoviesInputError,
  MoviesTextarea,
  PhotoIcon,
  WhiteCloseIcon,
} from 'components'
import Image, { ImageLoader } from 'next/image'
import { FormProvider } from 'react-hook-form'
import { checkTypeAndError } from 'helpers'
import Link from 'next/link'
import { Genres } from 'types'

const AddNewQuote = () => {
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
    currentMovie,
    genres,
    movie,
    storeNewQuote,
  } = useAddNewQuote()

  return (
    <>
      <div
        className={
          'absolute w-screen lgPlus:w-r60 min-h-full lg:min-h-r57 left-0 lgPlus:left-auto top-0 lgPlus:top-24 bg-blackBlueSoft z-50 lgPlus:z-30 lgPlus:rounded-xl lgPlus:ml-r045'
        }
      >
        <div className={`flex w-full justify-center items-center mt-8`}>
          <p
            className={`font-light text-xl text-white ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            }`}
          >
            {t('movies:addQuoteUpper')}
          </p>

          <Link
            href={`/movies/${movie}`}
            locale={locale}
            passHref
            className={`absolute ml-72 lg:ml-[55rem] flex items-center justify-center mt-1`}
          >
            <WhiteCloseIcon />
          </Link>
        </div>

        <div
          className={`w-full h-0.1 bg-whiteGraySoftLine mt-8 rounded-xl`}
        ></div>

        <div
          className={`flex flex-col justify-center items-center w-full mt-8`}
        >
          <div
            className={
              'flex justify-start items-center w-r19 nm:w-[22.375rem] lg:w-r55'
            }
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
              className={`font-light text-base text-white ml-4 ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              }`}
            >
              {userName && userName}
            </p>
          </div>

          {currentMovie && (
            <div
              className={`min-h-r09875 flex justify-center mt-8 w-r19 nm:w-[22.375rem] rounded-lg sm:rounded-0 lg:w-r55 bg-black lg:bg-transparent`}
            >
              <div className={`mt-4 sm:mt-0 mb-4 sm:mb-0`}>
                {currentMovie.thumbnail && (
                  <Image
                    priority={true}
                    unoptimized={true}
                    className='w-28 lg:w-r18125 min-h-full lg:min-h-full rounded-xl object-fill'
                    height={100}
                    width={100}
                    loader={(() => currentMovie.thumbnail) as ImageLoader}
                    src={currentMovie.thumbnail}
                    alt={'movie thumbnail'}
                  />
                )}
              </div>

              <div
                className={`flex flex-col w-[13rem] lg:w-r36125 ml-r01313 mt-4 lg:mt-0 mb-4 lg:mb-0`}
              >
                <div className={`flex items-center justify-between`}>
                  <p
                    className={`font-normal text-sm lg:text-xl text-movieTitle break-words ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`${
                      locale === 'en'
                        ? currentMovie.title?.en
                        : currentMovie.title?.ka
                    } (${currentMovie.release_date?.slice(0, 4)})
                `}
                  </p>
                </div>

                <div className={'flex mt-2 item-center lg:hidden'}>
                  <p
                    className={`font-normal text-sm text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`${t('movies:director')}:`}
                  </p>
                  {currentMovie.director && (
                    <p
                      className={`font-normal text-sm text-white ml-4 ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {`${
                        locale === 'en'
                          ? currentMovie?.director.en!
                          : currentMovie?.director.ka!
                      }`}
                    </p>
                  )}
                </div>

                {genres && (
                  <div
                    className={`flex flex-wrap w-[13rem] lg:w-r36125 gap-2 mt-2 lg:mt-6`}
                  >
                    {genres.map((el: Genres, inx) => (
                      <div
                        key={el.genre + inx}
                        className={`h-[1.3rem] lg:h-r01875 min-w-20 flex items-center justify-center bg-borderGraySoft rounded-sm cursor-default`}
                      >
                        <p
                          className={`font-medium text-sm lg:text-lg text-white font-helveticaKa ml-4 mr-4`}
                        >
                          {el.genre}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className={'hidden lg:flex mt-[1.606rem] item-center'}>
                  <p
                    className={`font-normal text-base text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`${t('movies:director')}:`}
                  </p>
                  {currentMovie.director && (
                    <p
                      className={`font-normal text-base text-white ml-4 ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {`${
                        locale === 'en'
                          ? currentMovie?.director.en!
                          : currentMovie?.director.ka!
                      }`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <FormProvider {...form}>
            <form
              className={`mt-[1.813rem]`}
              onSubmit={handleSubmit(storeNewQuote)}
            >
              <div className={`flex flex-col-reverse lg:flex-col`}>
                <MoviesTextarea
                  id={'quote_en'}
                  errors={{
                    required: t('errors:fieldIsRequired')!,
                    minLength: {
                      value: 10,
                      message: t('errors:minTextarea'),
                    },
                    maxLength: {
                      value: 600,
                      message: t('errors:maxTextarea'),
                    },
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
                    required: t('errors:fieldIsRequired')!,
                    minLength: {
                      value: 10,
                      message: t('errors:minTextarea'),
                    },
                    maxLength: {
                      value: 600,
                      message: t('errors:maxTextarea'),
                    },
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
                border border-borderGraySoft 
                font-normal rounded-md text-lg bg-transparent  w-r19 nm:w-[22.375rem] lg:w-r55 h-r055 outline-none mt-[2.875rem] flex justify-start items-center
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
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {t('movies:chooseFile')}
                    </p>
                  </div>
                  <p
                    className={`font-light text-base text-white font-helveticaKa ml-4
                  `}
                  >
                    {imageName}
                  </p>
                </div>

                <MoviesInputError errors={errors} name='image' />
              </div>

              <button
                type='submit'
                className={`bg-signInRed h-r027  w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-center 
                items-center rounded-md mt-8 cursor-pointer mb-12`}
              >
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {t('movies:addQuote')}
                </p>
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default AddNewQuote
