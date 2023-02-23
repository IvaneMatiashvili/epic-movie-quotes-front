import { useUserQuote } from './useUserQuote'
import React from 'react'
import { CommentsInput, ViewQuoteThumbnailAndComments } from 'components'
import Image from 'next/image'
import { Props } from './types'
import { gandalfProfile } from 'public'

const UserQuote: React.FC<Props> = (props) => {
  const { locale, t, updatedUserComments, setUpdatedUserComments } =
    useUserQuote()

  return (
    <>
      {props.userQuote?.quote?.en && (
        <>
          <div
            className={
              'w-[58.625rem] min-h-r57 bg-blackBlueSoft lgPlus:rounded-xl relative z-20'
            }
          >
            <div
              className={`flex flex-col justify-center items-center w-full mt-8`}
            >
              <div
                className={
                  'flex justify-start items-center w-r19 nm:w-[22.375rem] lg:w-r55 mt-6'
                }
              >
                <Image
                  priority={true}
                  unoptimized={true}
                  className='w-[3.25rem] h-[3.25rem] rounded-full object-fill'
                  height={100}
                  width={100}
                  loader={() =>
                    (props?.movie?.user?.user_image as string) ||
                    gandalfProfile.src
                  }
                  src={props?.movie?.user?.user_image || gandalfProfile.src}
                  alt={'user image'}
                />
                <p
                  className={`font-light text-base text-white ml-4 ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {props?.movie?.user?.name && props?.movie?.user?.name}
                </p>
              </div>

              {props?.movie?.title?.en && (
                <div
                  className={
                    'w-r19 nm:w-[22.375rem] lg:w-r55 flex mt-4 break-all'
                  }
                >
                  <p
                    className={`font-normal text-lg text-white ${
                      locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                    }`}
                  >
                    {`"${
                      locale === 'en'
                        ? props?.userQuote?.quote?.en
                        : props?.userQuote?.quote?.ka
                    }"
                    ${t('newsFeed:movie')}-`}
                    <span className={'text-movieTitle'}>
                      {`${
                        locale === 'en'
                          ? props?.movie?.title?.en
                          : props?.movie?.title?.ka
                      }.`}
                    </span>
                    {` (${props?.movie?.release_date?.slice(0, 4)})`}
                  </p>
                </div>
              )}

              <ViewQuoteThumbnailAndComments
                currentQuote={props.userQuote && props.userQuote}
                fromNewsFeed={true}
                updatedUserComments={updatedUserComments}
                quoteUserId={props.quoteUserId}
              />

              <CommentsInput
                userQuoteId={props?.userQuote?.id && props.userQuote.id}
                page={props.page && props.page}
                setUpdatedUserComments={setUpdatedUserComments}
                quoteUserId={props.quoteUserId}
              />
            </div>
          </div>
          <div className={'w-2 h-2 hidden lg:block'}></div>
        </>
      )}
    </>
  )
}

export default UserQuote
