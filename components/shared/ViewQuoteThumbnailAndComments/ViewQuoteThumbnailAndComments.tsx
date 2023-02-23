import Image from 'next/image'
import { CommentsIcon, LikesIcon } from 'components'
import React from 'react'
import { Props } from './types'
import { useViewQuoteThumbnailAndComments } from './useViewQuoteThumbnailAndComments'

const ViewQuoteThumbnailAndComments: React.FC<Props> = (props) => {
  const { hasLike, setLikeOrRemove, likesCounter, locale, defaultUserImage } =
    useViewQuoteThumbnailAndComments(
      props?.currentQuote?.likes!,
      props?.currentQuote?.id!,
      props?.currentQuote,
      props?.quoteUserId
    )

  return (
    <>
      {props.currentQuote.thumbnail && (
        <Image
          priority={true}
          unoptimized={true}
          className='w-r19 nm:w-[22.375rem] lg:w-r55 h-[18.875rem] lg:h-[32.063rem] rounded-lg object-fill mt-8'
          height={100}
          width={100}
          loader={() => props.currentQuote.thumbnail!}
          src={props.currentQuote.thumbnail}
          alt={'user image'}
        />
      )}

      <div className={`mt-6 w-r19 nm:w-[22.375rem] lg:w-r55 flex`}>
        <div className={'flex items-center'}>
          <p
            className={`font-light text-xl text-white mr-3 ${
              locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
            }`}
          >
            {props.currentQuote.comments && props.currentQuote.comments?.length}
          </p>
          <CommentsIcon />
        </div>

        <div className={'flex items-center justify-between ml-8'}>
          <p
            className={`font-light text-xl text-white ${
              props.currentQuote.likes?.length! + likesCounter >= 10
                ? 'w-10'
                : 'w-6'
            } ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
          >
            {props.currentQuote.likes && props.fromNewsFeed
              ? props.currentQuote.likes?.length + likesCounter
              : props.currentQuote.likes?.length}
          </p>
          <div onClick={setLikeOrRemove} className={'w-10 cursor-pointer'}>
            <LikesIcon hasLike={hasLike} />
          </div>
        </div>
      </div>
      <div className={'mt-[1.375rem] lg:mt-[0.708rem] '}></div>

      {props.fromNewsFeed && (
        <div
          className={`w-r19 nm:w-[22.375rem] lg:w-r55 h-0.1 bg-whiteGraySoftLine mt-[1.625rem]`}
        ></div>
      )}

      <div
        className={`w-r19 nm:w-[22.375rem] lg:w-r57 h-0.1 bg-whiteGraySoftLine lg:hidden`}
      ></div>

      <>
        {[...props.currentQuote?.comments!, ...props.updatedUserComments].map(
          (el, inx) => (
            <div
              key={`${el}${inx + Math.random()}`}
              className={`w-r19 nm:w-[22.375rem] lg:w-r55`}
            >
              <div
                className={`w-r19 nm:w-[22.375rem] lg:w-r55 flex items-center mt-6 justify-start`}
              >
                <Image
                  priority={true}
                  unoptimized={true}
                  className='w-[3.25rem] h-[3.25rem] rounded-full object-fill'
                  height={100}
                  width={100}
                  loader={() => el?.user?.user_image || defaultUserImage}
                  src={el?.user?.user_image || defaultUserImage}
                  alt={'user image'}
                />

                <p
                  className={`font-normal text-sm sm:text-base text-white ml-4 lg:ml-6 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {el?.user?.name && el?.user?.name}
                </p>
              </div>

              <div
                className={`w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-start`}
              >
                <div className='w-[3.25rem] h-[3.25rem] rounded-full hidden lg:block'>
                  {' '}
                </div>
                <p
                  className={`font-normal text-sm lg:text-base text-white lg:ml-6 break-all w-r19 nm:w-[18.5rem] lg:w-r52 mt-3 lg:mt-0 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {el.comment}
                </p>
              </div>

              <div
                className={`w-r19 nm:w-[22.375rem] lg:w-r55 flex justify-start`}
              >
                <div className='w-[3.25rem] rounded-full hidden lg:block'>
                  {' '}
                </div>

                <div
                  className={`w-r19 nm:w-[22.375rem] lg:w-r55 h-0.1 bg-whiteGraySoftLine mt-6 lg:ml-7`}
                ></div>
              </div>
            </div>
          )
        )}
      </>
    </>
  )
}
export default ViewQuoteThumbnailAndComments
