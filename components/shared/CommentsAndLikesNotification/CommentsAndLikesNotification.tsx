import React from 'react'
import { Props } from './types'
import Image from 'next/image'
import { gandalfProfile } from 'public'
import { useCommentsAndLikesNotification } from './useCommentsAndLikesNotification'
import { CommentsIconSmall, HeartIconSmall } from 'components'

const CommentsAndLikesNotification: React.FC<Props> = (props) => {
  const {
    locale,
    t,
    calcDifBetweenTwoDates,
    removeNotificationOnClick,
    isNew,
  } = useCommentsAndLikesNotification(props?.notification, props.isNewGlobal, props.setNotificationsQuantity)

  return (
    <div
      onClick={removeNotificationOnClick}
      className={`w-[56.063rem] min-h-[7.313rem] bg-transparent border border-borderGraySoftHalfTransparent rounded-md mt-4 flex justify-between cursor-pointer`}
    >
      <div className={`flex items-center ml-6`}>
        {props?.notification?.notificatable?.user?.name && (
          <Image
            priority={true}
            unoptimized={true}
            className='w-20 h-20 rounded-full object-fill'
            height={100}
            width={100}
            loader={() =>
              props?.notification?.notificatable?.user?.user_image ||
              gandalfProfile.src
            }
            src={
              props?.notification?.notificatable?.user?.user_image ||
              gandalfProfile.src
            }
            alt={'user image'}
          />
        )}

        <div className={`flex flex-col ml-6`}>
          {props?.notification?.notificatable?.user?.name && (
            <p
              className={`text-white ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              } font-normal text-lg`}
            >
              {props?.notification?.notificatable?.user?.name}
            </p>
          )}
          <div className={`flex mt-[0.531rem] items-center`}>
            {props?.notification?.notificatable?.like && <HeartIconSmall />}
            {props?.notification?.notificatable?.comment && (
              <CommentsIconSmall />
            )}
            <p
              className={`text-commented ml-3 ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              } font-normal text-base`}
            >
              {props?.notification?.notificatable?.like && t('common:reacted')}
              {props?.notification?.notificatable?.comment &&
                t('common:commented')}
            </p>
          </div>
        </div>
      </div>
      <div className={`flex flex-col items-end justify-center`}>
        <p
          className={`text-ago mr-5 ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          } font-normal text-base`}
        >
          {calcDifBetweenTwoDates(props?.notification?.created_at!)}
        </p>

        <p
          className={`text-smoothGreenColor mr-5 mt-[0.438rem] cursor-default ${
            isNew ? 'opacity-1' : 'opacity-0'
          } ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          } font-normal text-base`}
        >
          New
        </p>
      </div>
    </div>
  )
}

export default CommentsAndLikesNotification
