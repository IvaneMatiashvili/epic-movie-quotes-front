import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getQuote, removeNotification } from 'services'
import { FormObj, NewsFeedNotification, SetState } from 'types'

export const useCommentsAndLikesNotification = (
  notification: NewsFeedNotification,
  isNewGlobal: boolean,
  setNotificationsQuantity: SetState<number>
) => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()

  const { mutate: submitForm } = useMutation(removeNotification)
  const [isNew, setIsNew] = useState(false)
  const [movieId, setMovieId] = useState('')

  const calcDifBetweenTwoDates = (notificationsData: string) => {
    let currentDate: Date = new Date()
    let createdDate: Date = new Date(notificationsData)

    let dif: number = +currentDate - +createdDate
    let difInMinutes = ~~(dif / 1000 / 60)
    let difInHours = ~~(difInMinutes / 60)
    let difInDays = ~~(difInHours / 24)
    let difInYears = ~~(difInDays / 365)

    if (difInMinutes < 60) {
      return `${difInMinutes} ${t('common:minAgo')}`
    } else if (difInMinutes > 60 && difInMinutes < 1440) {
      return `${difInHours} ${t('common:hourAgo')}`
    } else if (difInMinutes >= 1440 && difInMinutes < 525600) {
      return `${difInDays} ${t('common:dayAgo')}`
    } else if (difInMinutes >= 525600) {
      return `${difInYears} ${t('common:yearAgo')}`
    }
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
    if (notification?.is_notification_on && isNewGlobal) {
      setIsNew(true)
    } else {
      setIsNew(false)
    }
  }, [setIsNew, notification, isNew, isNewGlobal])

  return {
    locale,
    t,
    calcDifBetweenTwoDates,
    removeNotificationOnClick,
    isNew,
  }
}
