import {
  AddNewEmailIcon,
  DeleteIcon,
  DotsIcon,
  EditIcon,
  LikesIcon,
  UserPageMainLayout,
  CommentsIcon,
  ViewQuoteIcon,
} from 'components'
import { useMovieDescriptionMain } from './useMovieDescriptionMain'
import Image, { ImageLoader } from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AddNewQuote } from '../AddNewQuote'
import { AddNewMovie } from '../AddNewMovie'
import { Genres, Quote } from 'types'

const MovieDescriptionMain = () => {
  const {
    t,
    locale,
    currentMovie,
    genres,
    stage,
    quotes,
    changeTextLength,
    openDropdown,
    openEditOrDelete,
    closeDropdown,
    isSetBackground,
    setIsSetBackground,
    edit,
    deleteMovieOnClick,
    deleteQuoteOnClick,
  } = useMovieDescriptionMain()

  return (
    <UserPageMainLayout setIsSetBackground={setIsSetBackground}>
      <>
        <div
          className={` mt-28 sm:mt-0 mx-auto lgPlus:ml-0 w-screen flex flex-col justify-center lgPlus:justify-start`}
        >
          <div
            className={`w-screen lgPlus:w-[92rem] flex flex-col items-center lgPlus:items-start lgPlus:ml-96 ${
              stage === 'addQuote' && 'min-h-screen'
            } `}
          >
            {!stage && (
              <>
                <div
                  className={
                    'w-r19 nm:w-[22.375rem] sm:w-[92rem] flex sm:justify-center lgPlus:justify-start items-start h-12'
                  }
                >
                  <p
                    className={`font-normal text-xl text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {t('movies:movieDescription')}
                  </p>
                </div>
                {currentMovie && (
                  <div
                    className={`w-r19 nm:w-[22.375rem] sm:w-r92 flex flex-col sm:items-center lgPlus:items-start xlPlus:flex-row mt-8`}
                  >
                    <div>
                      {currentMovie.thumbnail && (
                        <Image
                          priority={true}
                          unoptimized={true}
                          className='w-r19 nm:w-[22.375rem] h-[18.875rem] sm:w-r36125 lgPlus:w-r50 lgPlus:h-r2705 rounded-xl object-fill'
                          height={100}
                          width={100}
                          loader={(() => currentMovie.thumbnail) as ImageLoader}
                          src={currentMovie.thumbnail}
                          alt={'movie thumbnail'}
                        />
                      )}
                    </div>

                    <div
                      className={`flex flex-col w-r19 nm:w-[22.375rem] sm:w-r36125 xlPlus:ml-r01313 mt-6 xlPlus:mt-0`}
                    >
                      <div className={`flex items-center justify-between`}>
                        <p
                          className={`font-normal text-xl text-movieTitle break-all max-w-[19rem] nm:max-w-[22.375rem] ${
                            locale === 'en'
                              ? 'font-helveticaEn'
                              : 'font-helveticaKa'
                          }`}
                        >
                          {`${
                            locale === 'en'
                              ? currentMovie.title?.en
                              : currentMovie.title?.ka
                          } (${currentMovie.release_date?.slice(0, 4)})
                        `}
                        </p>

                        <div
                          className={`w-36 h-10 bg-deleteOrEdit hidden sm:flex items-center justify-center rounded-lg`}
                        >
                          <Link
                            href={`/movies/${currentMovie.id}?edit=editMovie`}
                            locale={locale}
                            passHref
                          >
                            <EditIcon />
                          </Link>
                          <div
                            className={`w-0.1 h-4 bg-borderGraySoft ml-8 mr-8`}
                          ></div>
                          <div
                            className={'cursor-pointer'}
                            onClick={deleteMovieOnClick}
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </div>
                      {genres && (
                        <div
                          className={`flex flex-wrap w-r19 nm:w-[22.375rem] sm:w-r36125 gap-2 mt-6`}
                        >
                          {genres.map((el: Genres, inx) => (
                            <div
                              key={el.genre && el?.genre[locale!] + inx}
                              className={`h-r01875 min-w-20 flex items-center justify-center bg-borderGraySoft rounded-sm cursor-default`}
                            >
                              <p
                                className={`font-medium text-lg text-white font-helveticaKa ml-4 mr-4`}
                              >
                                {el.genre && el?.genre[locale!]}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={'flex mt-7 item-center ml-3'}>
                        <p
                          className={`font-normal text-base text-white ${
                            locale === 'en'
                              ? 'font-helveticaEn'
                              : 'font-helveticaKa'
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

                      <div className={'flex mt-5 item-center ml-3'}>
                        <p
                          className={`font-normal text-base text-white ${
                            locale === 'en'
                              ? 'font-helveticaEn'
                              : 'font-helveticaKa'
                          }`}
                        >
                          {`${t('movies:budget')}:`}
                        </p>
                        {currentMovie.budget && (
                          <p
                            className={`font-normal text-base text-white ml-4 ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            }`}
                          >
                            {`${'2000000'
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}$`}
                          </p>
                        )}
                      </div>

                      {currentMovie.description && (
                        <p
                          className={`font-normal text-base text-smoothGrayText ml-3 break-words mt-5 ${
                            locale === 'en'
                              ? 'font-helveticaEn'
                              : 'font-helveticaKa'
                          }`}
                        >
                          {`${
                            locale === 'en'
                              ? currentMovie.description.en!
                              : currentMovie.description.ka!
                          }`}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className={`w-r19 nm:w-[22.375rem] flex sm:hidden mt-8`}>
                  <Link
                    href={`/movies/${currentMovie.id}?stage=addQuote`}
                    locale={locale}
                    passHref
                    className={`flex justify-center items-center ${
                      locale === 'en' ? 'w-[7.938rem]' : 'w-[9.2rem]'
                    } h-[2.375rem] sm:h-12 rounded-md bg-borderRed`}
                  >
                    <AddNewEmailIcon />
                    <p
                      className={`font-light text-sm sm:text-base text-white ml-2 ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {t('movies:addQuote')}
                    </p>
                  </Link>
                </div>
                <div
                  className={`h-0.1 w-r19 nm:w-[22.375rem] bg-borderGraySoft mt-12 sm:hidden`}
                ></div>

                <div
                  className={`w-r19 nm:w-[22.375rem] flex flex-col sm:hidden mt-[2.563rem]`}
                >
                  <p
                    className={`font-light text-xl text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`${t('movies:allQuotes')}`}
                  </p>

                  <p
                    className={`font-light text-xl text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`(${t('movies:total')} ${quotes.length})`}
                  </p>
                </div>

                <div className={`hidden sm:flex mt-12 items-center`}>
                  <p
                    className={`font-light text-xl text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`${t('movies:quotes')} (${t('movies:total')} ${
                      quotes.length
                    })`}
                  </p>
                  <div
                    className={`w-0.1 h-6 bg-borderGraySoft ml-4 mr-4`}
                  ></div>

                  <Link
                    href={`/movies/${currentMovie.id}?stage=addQuote`}
                    locale={locale}
                    passHref
                    className={`flex justify-center items-center ${
                      locale === 'en' ? 'w-40' : 'w-48'
                    } h-12 rounded-md bg-borderRed`}
                  >
                    <AddNewEmailIcon />
                    <p
                      className={`font-light text-base text-white ml-2 ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {t('movies:addQuote')}
                    </p>
                  </Link>
                </div>
              </>
            )}

            {stage === 'addQuote' && <AddNewQuote />}
          </div>

          {quotes && !stage && (
            <div
              className={`w-screen lgPlus:w-[92rem] mt-10 block sm:flex sm:flex-col items-center lgPlus:block lgPlus:ml-96`}
            >
              {quotes.map((el: Quote, inx) => (
                <div
                  key={`${el} ${Math.random()}`}
                  className={
                    'w-screen sm:w-r36125 lgPlus:w-r50563 min-h-[21.563rem] sm:min-h-[16.75rem] bg-blackBlueSoft rounded-md flex flex-col items-center mt-10'
                  }
                >
                  {openEditOrDelete[inx] && isSetBackground && (
                    <div
                      tabIndex={1}
                      className={`absolute w-r15578 h-r1205 flex items-center bg-deleteOrEdit ml-16 nm:ml-32 sm:ml-[18.5rem]  lgPlus:ml-r5902 mt-24 sm:mt-12 rounded-md z-40`}
                    >
                      <div className={`flex flex-col justify-around h-r1005`}>
                        <Link
                          href={`/movies/${currentMovie.id}/quote/${el.id}`}
                          locale={locale}
                          passHref
                          className={`flex items-center ml-10`}
                        >
                          <ViewQuoteIcon />
                          <p
                            className={`font-normal text-sm text-white ml-4 ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            }`}
                          >
                            {t('movies:viewQuote')}
                          </p>
                        </Link>
                        <Link
                          href={`/movies/${currentMovie.id}/quote/${el.id}?stage=editQuoteFromDescription`}
                          locale={locale}
                          passHref
                          className={`flex items-center ml-10`}
                        >
                          <EditIcon />
                          <p
                            className={`font-normal text-sm text-white ml-4 ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            }`}
                          >
                            {t('movies:edit')}
                          </p>
                        </Link>
                        <div
                          className={`flex items-center ml-10 cursor-pointer`}
                          onClick={() => deleteQuoteOnClick(el.id as string)}
                        >
                          <DeleteIcon />
                          <p
                            className={`font-normal text-sm text-white ml-4 ${
                              locale === 'en'
                                ? 'font-helveticaEn'
                                : 'font-helveticaKa'
                            }`}
                          >
                            {t('movies:delete')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    onClick={() => openDropdown(inx)}
                    className={`absolute mt-r02108 ml-[32rem] lgPlus:ml-r45 cursor-pointer hidden sm:block`}
                  >
                    <DotsIcon />
                  </div>
                  {openEditOrDelete[inx] && isSetBackground && (
                    <div
                      onClick={() => closeDropdown(inx)}
                      className={`fixed flex top-0 left-0 w-screen h-screen bg-transparent`}
                    ></div>
                  )}

                  <div
                    className={`flex flex-col sm:flex-row items-center pt-6 sm:w-r36125 lgPlus:w-r46563`}
                  >
                    {el.thumbnail && (
                      <Image
                        priority={true}
                        unoptimized={true}
                        className='w-r19 nm:w-[22.375rem] sm:w-r1675 h-r0875 rounded-xl object-fill ml-0 sm:pl-2 lgPlus:ml-0'
                        height={100}
                        width={100}
                        loader={(() => currentMovie.thumbnail) as ImageLoader}
                        src={el.thumbnail}
                        alt={'movie thumbnail'}
                      />
                    )}

                    <p
                      className={`font-light text-xl text-smoothGrayText italic break-all sm:ml-[2.125rem] w-[19.25rem] sm:w-[13.5rem] lgPlus:w-r26 hidden sm:block ${
                        locale === 'en'
                          ? 'font-helveticaEn'
                          : 'font-helveticaKa'
                      }`}
                    >
                      {el?.quote &&
                        `"${changeTextLength(
                          locale === 'en' ? el.quote.en : el.quote.ka
                        )}`}
                    </p>
                    <div className={'w-r19 nm:w-[22.375rem] sm:hidden mt-6'}>
                      <p
                        className={`font-light text-xl text-smoothGrayText break-all italic w-[19.25rem] sm:w-r26 ${
                          locale === 'en'
                            ? 'font-helveticaEn'
                            : 'font-helveticaKa'
                        }`}
                      >
                        {el?.quote &&
                          `"${changeTextLength(
                            locale === 'en' ? el.quote.en : el.quote.ka
                          )}`}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`h-0.1 w-r19 nm:w-[22.375rem] sm:sm:w-r36125 lgPlus:w-r46563 bg-whiteGraySoftLine mt-6`}
                  ></div>

                  <div
                    className={`mt-6 w-r19 nm:w-[22.375rem] sm:sm:w-r36125 lgPlus:w-r46563 ml-4 flex`}
                  >
                    <div className={'flex items-center'}>
                      <p
                        className={`font-light text-xl text-white mr-3 ${
                          locale === 'en'
                            ? 'font-helveticaEn'
                            : 'font-helveticaKa'
                        }`}
                      >
                        {el?.comments && el.comments.length}
                      </p>
                      <CommentsIcon />
                    </div>

                    <div className={'flex items-center ml-8'}>
                      <p
                        className={`font-light text-xl text-white mr-3 ${
                          locale === 'en'
                            ? 'font-helveticaEn'
                            : 'font-helveticaKa'
                        }`}
                      >
                        {el.likes && el.likes.length}
                      </p>
                      <LikesIcon />
                    </div>

                    <div
                      onClick={() => openDropdown(inx)}
                      className={`absolute w-r19 nm:w-[22.375rem] ml-[-0.5rem] flex justify-end cursor-pointer sm:hidden`}
                    >
                      <DotsIcon />
                    </div>
                    {openEditOrDelete[inx] && isSetBackground && (
                      <div
                        onClick={() => closeDropdown(inx)}
                        className={`fixed flex top-0 left-0 w-screen h-screen bg-transparent`}
                      ></div>
                    )}
                  </div>
                  <div
                    className={'w-10 h-10 hidden sm:block lgPlus:hidden'}
                  ></div>
                </div>
              ))}
            </div>
          )}

          <div className={`w-10 h-10`}></div>
          {stage === 'addQuote' && <div className={`w-10 h-10 `}></div>}
        </div>
        {edit === 'editMovie' && <AddNewMovie />}
      </>
    </UserPageMainLayout>
  )
}

export default MovieDescriptionMain
