import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getQuote, removeNotification } from 'services'
import { FormObj, NewsFeedNotification, SetState } from 'types'
import { useCalcDifBetweenTwoDates } from 'hooks'

export const useCommentsAndLikesNotification = (
  notification: NewsFeedNotification,
  isNewGlobal: boolean,
  setNotificationsQuantity: SetState<number>,
  newNotifications: NewsFeedNotification[]
) => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(removeNotification)
  const [isNew, setIsNew] = useState(false)
  const [movieId, setMovieId] = useState('')

  const { calculate } = useCalcDifBetweenTwoDates()

  const calcDifBetweenTwoDates = (notificationsData: string) => {
    return calculate(notificationsData)
  }

  useQuery(
    ['quote', notification?.notificatable?.quote_id],
    () => getQuote(notification.notificatable?.quote_id as string),
    {
      onSuccess: (response) => {
        setMovieId(response.data.movie_id)
      },
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  const removeNotificationOnClick = () => {
    const data: FormObj = {}

    data['removed_notification_id'] = notification.id!

    submitForm(data, {
      onSuccess: async () => {
        setIsNew(false)
        setNotificationsQuantity((prev) => prev - 1)

        push(`/movies/${movieId}/quote/${notification.notificatable?.quote_id}`)
      },
    })
  }

  useEffect(() => {
    if (
      (notification?.is_notification_on && isNewGlobal) ||
      (newNotifications &&
        newNotifications.filter((el) => el?.id === notification?.id).length > 0)
    ) {
      setIsNew(true)
    } else {
      setIsNew(false)
    }
  }, [setIsNew, notification, isNew, isNewGlobal, newNotifications])

  return {
    locale,
    t,
    calcDifBetweenTwoDates,
    removeNotificationOnClick,
    isNew,
  }
}
