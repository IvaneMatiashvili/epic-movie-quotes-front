import { useAddQuoteUserAndMovieInfo } from './useAddQuoteUserAndMovieInfo'
import Image, { ImageLoader } from 'next/image'
import React from 'react'
import { Props } from './types'
import { Genres } from 'types'

const AddQuoteUserAndMovieInfo: React.FC<Props> = (props) => {
  const { locale, t } = useAddQuoteUserAndMovieInfo()

  return (
    <>
      <div
        className={
          'flex justify-start items-center w-r19 nm:w-[22.375rem] lg:w-r55'
        }
      >
        {props.currentUserImageUrl && (
          <Image
            priority={true}
            unoptimized={true}
            className='w-16 h-16 rounded-full object-fill'
            height={100}
            width={100}
            loader={() => props.currentUserImageUrl}
            src={props.currentUserImageUrl}
            alt={'user image'}
          />
        )}
        <p
          className={`font-light text-base text-white ml-4 ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {props.userName && props.userName}
        </p>
      </div>

      {props.currentMovie && (
        <div
          className={`min-h-r09875 flex justify-center mt-8 w-r19 nm:w-[22.375rem] rounded-lg sm:rounded-0 lg:w-r55 bg-black lg:bg-transparent`}
        >
          <div className={`mt-4 sm:mt-0 mb-4 sm:mb-0`}>
            {props.currentMovie.thumbnail && (
              <Image
                priority={true}
                unoptimized={true}
                className='w-28 lg:w-r18125 min-h-full lg:min-h-full rounded-xl object-fill'
                height={100}
                width={100}
                loader={(() => props.currentMovie.thumbnail) as ImageLoader}
                src={props.currentMovie.thumbnail}
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
                    ? props.currentMovie.title?.en
                    : props.currentMovie.title?.ka
                } (${props.currentMovie.release_date?.slice(0, 4)})
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
              {props.currentMovie.director && (
                <p
                  className={`font-normal text-sm text-white ml-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {`${
                    locale === 'en'
                      ? props.currentMovie?.director.en!
                      : props.currentMovie?.director.ka!
                  }`}
                </p>
              )}
            </div>

            {props.genres && (
              <div
                className={`flex flex-wrap w-[13rem] lg:w-r36125 gap-2 mt-2 lg:mt-6`}
              >
                {props.genres.map((el: Genres, inx) => (
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
              {props.currentMovie.director && (
                <p
                  className={`font-normal text-base text-white ml-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {`${
                    locale === 'en'
                      ? props.currentMovie?.director.en!
                      : props.currentMovie?.director.ka!
                  }`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddQuoteUserAndMovieInfo
