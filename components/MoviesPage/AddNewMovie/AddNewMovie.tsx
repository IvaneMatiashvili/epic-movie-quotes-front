import { useAddNewMovie } from './useAddNewMovie'
import React from 'react'
import {
  CloseIconSmall,
  MoviesInputError,
  MoviesInputTypeText,
  MoviesTextarea,
  PhotoIcon,
  WhiteCloseIcon,
} from 'components'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import { checkTypeAndError } from 'helpers'
import Link from 'next/link'

const AddNewMovie = () => {
  const {
    locale,
    t,
    currentUserImageUrl,
    form,
    userName,
    errors,
    genres,
    openDropdown,
    closeDropdown,
    isOpenDropdown,
    chooseGenres,
    selectedGenres,
    removeSelectedGenres,
    stopEventPropagation,
    changeTextTypeOnBlur,
    changeTextTypeOnFocus,
    isTypeText,
    register,
    datePlaceholder,
    isUndefinedError,
    getImageValue,
    imageName,
    isUndefinedImageError,
    isUndefinedGenresError,
    checkDate,
    handleSubmit,
    storeNewMovie,
    edit,
    currentMovie,
    movie,
  } = useAddNewMovie()

  return (
    <>
      <div
        className={
          'fixed w-screen lgPlus:w-r60 h-full lgPlus:h-[90vh] top-0 lgPlus:top-24 inset-x-0 mx-auto bg-blackBlueSoft z-50 lgPlus:z-40 lgPlus:rounded-xl overflow-x-hidden overflow-y-scroll'
        }
      >
        {isOpenDropdown && (
          <div
            onClick={closeDropdown}
            className={
              'w-screen sm:w-r60 h-r62 bg-transparent fixed z-30 absolute'
            }
          ></div>
        )}
        <div className={`flex w-full justify-center items-center mt-8`}>
          <p
            className={`font-light text-xl text-white ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            }`}
          >
            {edit ? t('movies:editMovie') : t('movies:addMovie')}
          </p>

          <Link
            href={edit ? `/movies/${movie}` : '/movies'}
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

          {(!edit || currentMovie?.title) && (
            <FormProvider {...form}>
              <form className={`mt-2`} onSubmit={handleSubmit(storeNewMovie)}>
                <MoviesInputTypeText
                  name='name_en'
                  errors={{
                    required: t('errors:fieldIsRequired'),
                    minLength: {
                      value: 1,
                      message: t('errors:minMovies'),
                    },
                    maxLength: {
                      value: 255,
                      message: t('errors:maxMovies'),
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                      message: t('errors:onlyEnglishLetters'),
                    },
                  }}
                  id='name_en'
                  key='name_en'
                  placeholder={'Movie name'}
                  error={errors.name_en}
                  isEnglish={true}
                  value={currentMovie && currentMovie.title?.en}
                />

                <MoviesInputError errors={errors} name='name_en' />

                <MoviesInputTypeText
                  name='name_ka'
                  errors={{
                    required: t('errors:fieldIsRequired'),
                    minLength: {
                      value: 1,
                      message: t('errors:minMovies'),
                    },
                    maxLength: {
                      value: 255,
                      message: t('errors:maxMovies'),
                    },
                    pattern: {
                      value: /^[ა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                      message: t('errors:onlyGeorgianLetters'),
                    },
                  }}
                  id='name_ka'
                  key='name_ka'
                  error={errors.name_ka}
                  placeholder={'ფილმის სახელი'}
                  isEnglish={false}
                  value={currentMovie && currentMovie.title?.ka}
                />
                <MoviesInputError errors={errors} name='name_ka' />

                <div
                  onClick={openDropdown}
                  className={`
            border border-borderGraySoft
                  ${checkTypeAndError({
                    error: errors.genres,
                    isUndefinedError: isUndefinedGenresError,
                    forMovieOrNewsFeedPage: true,
                  })}
            font-normal rounded-md text-lg bg-transparent w-r19 nm:w-[22.375rem] lg:w-r55 min-h-[2.7rem] mt-5 flex items-center cursor-pointer flex-wrap
            `}
                >
                  {selectedGenres.length === 0 && (
                    <p
                      className={`font-normal text-base text-borderGraySoft font-helveticaKa ml-4`}
                    >
                      Choose genre
                    </p>
                  )}

                  {selectedGenres &&
                    selectedGenres.map((el, inx) => (
                      <div
                        key={el[locale!] + 'Selected' + inx}
                        onClick={(e) => stopEventPropagation(e)}
                        className={`h-6 flex items-center bg-borderGraySoft ml-4 rounded-sm cursor-default mt-1 mb-1`}
                      >
                        <div className={'mr-2'}></div>
                        <p
                          className={`font-normal text-sm text-white font-helveticaKa`}
                        >
                          {el[locale!]}
                        </p>

                        <div
                          onClick={() => {
                            removeSelectedGenres(el)
                          }}
                          className={
                            'h-1 flex items-center justify-center cursor-pointer mt-[2px] ml-2 relative'
                          }
                        >
                          <CloseIconSmall />
                        </div>
                        <div className={'ml-2'}></div>
                      </div>
                    ))}
                </div>
                {isOpenDropdown && genres && (
                  <>
                    <div
                      className={`absolute bg-dropdownBackground w-r19 nm:w-[22.375rem] lg:w-r55 h-40 overflow-y-scroll rounded-md z-40`}
                    ></div>
                    <div
                      className={`absolute bg-borderBlackBlue/60 backdrop-blur-xl w-r19 nm:w-[22.375rem] lg:w-r55 h-40 overflow-x-hidden overflow-y-scroll rounded-md z-40`}
                    >
                      {genres.map((el, inx) => (
                        <div
                          key={el[locale!] + inx}
                          onClick={() => chooseGenres(el)}
                          className={`h-8 flex items-center cursor-pointer z-40 hover:bg-dropdownHover ${
                            selectedGenres.filter((elm) => elm.en === el.en)
                              .length > 0 && 'hidden'
                          }`}
                        >
                          {
                            <p
                              className={`font-normal text-base text-white font-helveticaKa ml-4`}
                            >
                              {el[locale!]}
                            </p>
                          }
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <input
                  id='genres'
                  {...register('genres', {
                    required: t('errors:fieldIsRequired')!,
                  })}
                  className={`hidden
                `}
                ></input>

                <MoviesInputError errors={errors} name='genres' />

                <MoviesInputTypeText
                  name='director_en'
                  errors={{
                    required: t('errors:fieldIsRequired'),
                    minLength: {
                      value: 1,
                      message: t('errors:minMovies'),
                    },
                    maxLength: {
                      value: 255,
                      message: t('errors:maxMovies'),
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                      message: t('errors:onlyEnglishLetters'),
                    },
                  }}
                  id='director_en'
                  key='director_en'
                  error={errors.director_en}
                  placeholder={'Director'}
                  isEnglish={true}
                  value={currentMovie && currentMovie.director?.en}
                />
                <MoviesInputError errors={errors} name='director_en' />

                <MoviesInputTypeText
                  name='director_ka'
                  errors={{
                    required: t('errors:fieldIsRequired'),
                    minLength: {
                      value: 1,
                      message: t('errors:minMovies'),
                    },
                    maxLength: {
                      value: 255,
                      message: t('errors:maxMovies'),
                    },
                    pattern: {
                      value: /^[ა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                      message: t('errors:onlyGeorgianLetters'),
                    },
                  }}
                  id='director_ka'
                  key='director_ka'
                  error={errors.director_ka}
                  placeholder={'რეჟისორი'}
                  isEnglish={false}
                  value={currentMovie && currentMovie.director?.ka}
                />
                <MoviesInputError errors={errors} name='director_ka' />

                <MoviesTextarea
                  id={'description_en'}
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
                  name={'description_en'}
                  placeholder={'Movie description'}
                  key={'description_en'}
                  isEnglish={true}
                  error={errors.description_en}
                  value={currentMovie && currentMovie.description?.en}
                />

                <MoviesInputError errors={errors} name='description_en' />

                <MoviesTextarea
                  id={'description_ka'}
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
                  name={'description_ka'}
                  placeholder={'ფილმის აღწერა'}
                  key={'description_ka'}
                  isEnglish={false}
                  error={errors.description_ka}
                  value={currentMovie && currentMovie.description?.ka}
                />

                <MoviesInputError errors={errors} name='description_ka' />

                <input
                  defaultValue={
                    edit &&
                    currentMovie.release_date &&
                    currentMovie.release_date
                  }
                  id={'date'}
                  type={isTypeText ? 'text' : 'date'}
                  placeholder={
                    datePlaceholder
                      ? (datePlaceholder as string)
                      : t('movies:releaseDate')!
                  }
                  onFocus={changeTextTypeOnFocus}
                  {...register('release_date', {
                    required: t('errors:fieldIsRequired')!,
                  })}
                  onChange={checkDate}
                  onBlur={changeTextTypeOnBlur}
                  className={`font-helveticaKa placeholder-borderGraySoft ${
                    !isTypeText || datePlaceholder
                      ? 'text-white'
                      : 'text-borderGraySoft'
                  } placeholder-4 placeholder-base mt-5
                border border-borderGraySoft 
                 ${checkTypeAndError({
                   error: errors.release_date,
                   isUndefinedError,
                   forMovieOrNewsFeedPage: true,
                 })}
                font-normal rounded-md text-lg bg-transparent pl-4 w-r19 nm:w-[22.375rem] lg:w-r55 h-r027 outline-none pr-11 cursor-pointer`}
                />

                <MoviesInputError errors={errors} name='release_date' />

                <MoviesInputTypeText
                  name='budget'
                  errors={{
                    required: t('errors:fieldIsRequired'),
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: t('errors:onlyDigits'),
                    },
                  }}
                  id='budget'
                  key='budget'
                  error={errors.budget}
                  placeholder={t('movies:budget')}
                  isEnglish={false}
                  budget={true}
                  value={currentMovie && currentMovie.budget}
                />
                <MoviesInputError errors={errors} name='budget' />

                <div
                  className={` 
                font-normal rounded-md text-lg bg-transparent w-r19 nm:w-[22.375rem] lg:w-r55 h-r055 outline-none mt-8 flex justify-start items-center`}
                >
                  <input
                    type='file'
                    id='uploadImage'
                    {...register('image', {
                      required: !edit && t('errors:fieldIsRequired')!,
                    })}
                    multiple
                    onChange={getImageValue}
                    onFocus={getImageValue}
                    accept='image/*'
                    title=' '
                    className={` absolute
                border border-borderGraySoft 
                font-normal rounded-md text-lg bg-transparent w-r19 nm:w-[22.375rem] lg:w-r55 h-r055 outline-none cursor-pointer z-10
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
                    className={`font-light text-xs nm:text-sm lg:text-base text-white ml-4 lg:hidden w-40 ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {t('movies:uploadImage')}
                  </p>

                  <div className='flex bg-chooseFile items-center justify-center w-36 h-10 rounded-sm ml-4'>
                    <p
                      className={`font-light text-xs lg:text-base text-white ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
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
                  className={`font-light text-base text-white font-helveticaKa absolute lg:hidden
                  `}
                >
                  {imageName}
                </p>

                <MoviesInputError errors={errors} name='image' />

                <button
                  type='submit'
                  className={`bg-signInRed h-r027 w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-center 
            items-center rounded-md mt-8 cursor-pointer`}
                >
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                  >
                    {edit ? t('movies:editMovie') : t('movies:addMovie')}
                  </p>
                </button>
              </form>
            </FormProvider>
          )}
        </div>
        <div className={'w-20 h-20'}></div>
      </div>
    </>
  )
}

export default AddNewMovie
