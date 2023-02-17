import { useEditQuote } from './useEditQuote'
import React from 'react'
import {
  DeleteIcon,
  MoviesInputError,
  MoviesTextarea,
  SmallPhotoIcon,
  WhiteCloseIcon,
} from 'components'
import Image from 'next/image'
import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { checkTypeAndError } from 'helpers'

const EditQuote = () => {
  const {
    locale,
    t,
    movie,
    currentQuote,
    currentUserImageUrl,
    userName,
    errors,
    register,
    getImageValue,
    isUndefinedImageError,
    handleSubmit,
    form,
    imageValue,
    storeNewQuote,
    quote,
    stage,
    deleteQuoteOnClick,
  } = useEditQuote()

  return (
    <div className={'min-h-screen bg-layoutBackground w-screen'}>
      <div
        className={
          'absolute w-screen top-0 left-0 lgPlus:w-r60 min-h-r57 bg-blackBlueSoft lgPlus:relative z-50 lgPlus:z-30 lgPlus:rounded-xl lgPlus:ml-r045 flex flex-col items-center'
        }
      >
        <div className={`flex w-full justify-center items-center`}>
          <div
            className={`absolute mr-72 lg:mr-r55 w-36 h-10 bg-transparent flex items-center justify-center rounded-lg mt-[2.063rem]`}
          >
            <div className={'cursor-pointer'} onClick={deleteQuoteOnClick}>
              <DeleteIcon />
            </div>
          </div>
          <p
            className={`font-light text-xl text-white mt-[2.063rem] ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            }`}
          >
            {t('movies:editQuote')}
          </p>

          <Link
            href={`${
              stage === 'editQuote'
                ? `/movies/${movie}/quote/${quote}`
                : `/movies/${movie}`
            }`}
            locale={locale}
            passHref
            className={`absolute ml-72 lg:ml-r55 flex items-center justify-center mt-[2.063rem]`}
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
        </div>

        <FormProvider {...form}>
          {currentQuote.quote && (
            <form onSubmit={handleSubmit(storeNewQuote)}>
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
                value={currentQuote.quote?.en}
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
                value={currentQuote.quote?.ka}
                isEnglish={false}
                error={errors.quote_ka}
              />

              <MoviesInputError errors={errors} name='quote_ka' />

              {currentQuote.thumbnail && (
                <div
                  className={`
                border border-borderGraySoft 
                font-normal rounded-md text-lg bg-transparent w-r19 nm:w-[22.375rem] lg:w-r55 h-[18.875rem] lg:h-[32.063rem] outline-none mt-[1.313rem] flex flex-col justify-center items-center
                `}
                >
                  <Image
                    priority={true}
                    unoptimized={true}
                    className='w-r19 nm:w-[22.375rem] lg:w-r55 h-[18.875rem] lg:h-[32.063rem] rounded-lg object-fill'
                    height={100}
                    width={100}
                    loader={() =>
                      imageValue
                        ? URL.createObjectURL(imageValue as File)
                        : currentQuote.thumbnail!
                    }
                    src={
                      imageValue
                        ? URL.createObjectURL(imageValue as File)
                        : currentQuote.thumbnail
                    }
                    alt={'user image'}
                  />
                  <input
                    type='file'
                    id='uploadImage'
                    {...register('image')}
                    multiple
                    onChange={getImageValue}
                    accept='image/*'
                    title=' '
                    className={` absolute
                border border-borderGraySoft 
                font-normal rounded-md text-lg bg-white/10 w-r19 nm:w-[22.375rem] lg:w-r55 h-[18.875rem] lg:h-[32.063rem] outline-none cursor-pointer z-10
                 ${checkTypeAndError({
                   error: errors.image,
                   isUndefinedError: isUndefinedImageError,
                 })}
                `}
                  ></input>
                  <div
                    className={
                      'absolute w-[8.438rem] h-[5.25rem] flex flex-col justify-center items-center bg-photoBg rounded-xl backdrop-blur-sm'
                    }
                  >
                    <div>
                      <SmallPhotoIcon />
                    </div>

                    <p
                      className={`font-normal text-sm text-white mt-[0.656rem] ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {t('movies:changePhoto')}
                    </p>
                  </div>
                </div>
              )}

              <MoviesInputError errors={errors} name='image' />

              <button
                type='submit'
                className={`bg-signInRed h-r027 w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-center 
            items-center rounded-md mt-10 cursor-pointer mb-12`}
              >
                <p
                  className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                >
                  {t('movies:saveChanges')}
                </p>
              </button>
            </form>
          )}
        </FormProvider>
      </div>
      <div className={'w-10 h-20'}></div>
    </div>
  )
}

export default EditQuote
