import { useViewQuote } from './useViewQuote'
import React from 'react'
import {
  CommentsInput,
  DeleteIcon,
  EditIcon,
  MoviesTextarea,
  UserPageMainLayout,
  WhiteCloseIcon,
  ViewQuoteThumbnailAndComments,
} from 'components'
import Image from 'next/image'
import Link from 'next/link'
import { EditQuote } from '../EditQuote'
import { FormProvider } from 'react-hook-form'

const ViewQuote = () => {
  const {
    locale,
    t,
    movie,
    currentQuote,
    currentUserImageUrl,
    userName,
    quote,
    stage,
    form,
    deleteQuoteOnClick,
  } = useViewQuote()

  return (
    <UserPageMainLayout>
      <>
        {!stage && (
          <div
            className={
              'min-h-screen bg-layoutBackground w-screen flex flex-col items-center justify-center'
            }
          >
            <div
              className={
                'absolute w-screen lgPlus:w-r60 min-h-r57 top-0 left-0 bg-blackBlueSoft lgPlus:relative z-50 lgPlus:z-30 lgPlus:rounded-xl sm:ml-0 lgPlus:ml-40 xlPlus:ml-0'
              }
            >
              <div
                className={`flex w-full justify-center items-center lg:mt-4`}
              >
                <div
                  className={`absolute mr-60 nm:mr-72 lg:mr-[50rem] w-36 h-10 bg-transparent flex items-center justify-center rounded-lg mt-[2.063rem]`}
                >
                  <Link
                    href={`/movies/${movie}/quote/${quote}?stage=editQuote`}
                    passHref
                    locale={locale}
                  >
                    <EditIcon />
                  </Link>
                  <div
                    className={`w-0.1 h-4 bg-borderGraySoft ml-6 mr-6`}
                  ></div>
                  <div
                    className={'cursor-pointer'}
                    onClick={deleteQuoteOnClick}
                  >
                    <DeleteIcon />
                  </div>
                </div>
                <p
                  className={`font-light text-xl text-white mt-[2.063rem] hidden sm:block ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {t('movies:viewQuoteUpper')}
                </p>
                <p
                  className={`font-light text-xl text-white mt-[2.063rem] sm:hidden opacity-0 cursor-default ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  .
                </p>

                <Link
                  href={`${
                    stage === 'addQuote'
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

                <FormProvider {...form}>
                  <form>
                    {currentQuote?.quote?.en && (
                      <div className={`flex flex-col`}>
                        <MoviesTextarea
                          id={'quote_en'}
                          errors={{
                            required: t('errors:fieldIsRequired')!,
                          }}
                          name={'quote_en'}
                          placeholder={'"Quote in English."'}
                          key={'quote_en'}
                          isEnglish={true}
                          value={
                            currentQuote?.quote?.ka &&
                            `"${currentQuote.quote.en}"`
                          }
                          disabled={true}
                        />

                        <MoviesTextarea
                          id={'quote_ka'}
                          errors={{
                            required: t('errors:fieldIsRequired')!,
                          }}
                          name={'quote_ka'}
                          placeholder={'“ციტატა ქართულ ენაზე”'}
                          key={'quote_ka'}
                          isEnglish={false}
                          value={
                            currentQuote?.quote?.ka &&
                            `"${currentQuote.quote.ka}"`
                          }
                          disabled={true}
                        />
                      </div>
                    )}
                  </form>
                </FormProvider>

                <ViewQuoteThumbnailAndComments
                  currentQuote={currentQuote}
                  updatedUserComments={[]}
                />

                <CommentsInput />
              </div>
            </div>
            <div className={'w-10 h-20 hidden lg:block'}></div>
          </div>
        )}

        {(stage === 'editQuote' || stage === 'editQuoteFromDescription') && (
          <EditQuote />
        )}
      </>
    </UserPageMainLayout>
  )
}

export default ViewQuote
