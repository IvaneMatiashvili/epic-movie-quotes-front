import { useAddNewQuote } from './useAddNewQuote'
import React from 'react'
import {
  MoviesInputError,
  MoviesTextarea,
  PhotoIcon,
  WhiteCloseIcon,
} from 'components'
import { FormProvider } from 'react-hook-form'
import { checkTypeAndError } from 'helpers'
import Link from 'next/link'
import { AddQuoteUserAndMovieInfo } from '../AddQuoteUserAndMovieInfo'

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
          'absolute w-screen lgPlus:w-r60 min-h-full lg:min-h-r57 inset-x-0 mx-auto top-0 lgPlus:top-24 bg-blackBlueSoft z-50 lgPlus:z-30 lgPlus:rounded-xl'
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
          <AddQuoteUserAndMovieInfo
            currentUserImageUrl={currentUserImageUrl}
            userName={userName}
            currentMovie={currentMovie}
            genres={genres}
          />

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
