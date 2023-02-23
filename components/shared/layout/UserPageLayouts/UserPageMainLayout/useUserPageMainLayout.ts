import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import {
  NewsFeedNotification,
  ReactDivMouseEvent,
  RootState,
  SetState,
} from 'types'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'
import Echo from 'laravel-echo'
/*
import Pusher from 'pusher-js'
*/
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getNotifications, removeNotifications } from 'services'
import axios from 'axios'

export const useUserPageMainLayout = (
  setIsSetBackground: SetState<boolean> | undefined
) => {
  const { t } = useTranslation()
  const { locale, query, push, asPath, pathname } = useRouter()
  const { stage, movie, quote, edit } = query
  useAuth()

  const { mutate: submitForm } = useMutation(removeNotifications)
  const queryClient = useQueryClient()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const [notifications, setNotifications] = useState<NewsFeedNotification[]>([])
  const [notificationsQuantity, setNotificationsQuantity] = useState(0)
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false)

  const [isNewGlobal, setIsNewGlobal] = useState(true)

  const [page, setPage] = useState(0)

  const [newNotification, setNewNotification] = useState<NewsFeedNotification>()
  const [hasMoreItems, setHasMoreItems] = useState(true)

  const [isNotificationsRemoved, setIsNotificationsRemoved] = useState(false)

  const userInformation = useSelector((state: RootState) => state.userData)

  useQuery('removedNotifications', removeNotifications, {
    onSuccess: (r) => {
      setIsNotificationsRemoved(false)
      setNotificationsQuantity(0)
      queryClient.invalidateQueries('notifications')
      setIsNewGlobal(false)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    enabled: isNotificationsRemoved,
  })

  const loadDataOnlyOnce = useCallback(async () => {
    if (window.pusher !== undefined) {
      return
    }
    window.pusher = require('pusher-js')

    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URI}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    )

    console.log(token.config.headers)
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URI}/sanctum/csrf-cookie`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        const echo = new Echo({
          broadcaster: 'pusher',
          key: 'c183e17a23475f0d5d2b',
          cluster: 'mt1',
          forceTLS: true,
          authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URI}/api/broadcasting/auth`,
          withCredentials: true,

          auth: {
            withCredentials: true,
            headers: response.config.headers,
          },
        })
        echo
          .private(`notifications` + userInformation.id)
          .listen(`NotificationStored`, (e) => {
            setNotifications((prev) => [e.comment, ...prev])
            setNotificationsQuantity((prev) => prev + 1)
            setIsNewGlobal(true)
          })
      })
  }, [])

  useEffect(() => {
    loadDataOnlyOnce()
  }, [loadDataOnlyOnce])

  useQuery(['notifications', page], () => getNotifications(page), {
    onSuccess: (response) => {
      const data: NewsFeedNotification[] = response?.data[0]

      if (page === 0) {
        setNotificationsQuantity(response?.data[1])
      }
      setNotifications((prev) => [...prev, ...data])

      if (data.length === 0) {
        setHasMoreItems(false)
      }
    },
    retry: 0,
  })

  const getQuoteNotifications = async () => {
    setTimeout(() => {
      setPage((prev) => prev + 10)
    }, 100)
  }

  const removeNotificationsOnClick = () => {
    setIsNotificationsRemoved(true)
  }

  const openNotificationsModal = (e: ReactDivMouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setIsNotificationsModalOpen(true)
  }

  const closeNotificationsModal = (e: ReactDivMouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setIsNotificationsModalOpen(false)
  }

  const dropdownSwitcher = (e: ReactDivMouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()

    if (!isActiveDropdown) {
      setIsActiveDropdown(true)
    } else {
      setIsActiveDropdown(false)
    }
  }
  const closeDropdownOnBlur = async (e: ReactDivMouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (isActiveDropdown) {
      setIsActiveDropdown(false)
    }
    setIsSetBackground && setIsSetBackground(false)

    switch (pathname.split('/')[1]) {
      case 'profile':
        push('profile')
        break
      case 'movies':
        if (stage === 'addMovie' || stage === 'search' || edit) {
          push('movies')
        } else if (stage === 'editQuote') {
          push(`/movies/${movie}/quote/${quote}`)
        } else if (stage === 'addQuote' || quote) {
          push(`/movies/${movie}`)
        }
        break
    }
  }

  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image)
      : setCurrentImageUrl(gandalfProfile.src)
    userInformation.name && setUserName(userInformation.name)
  }, [userInformation])

  return {
    t,
    locale,
    isActiveDropdown,
    dropdownSwitcher,
    closeDropdownOnBlur,
    currentUserImageUrl,
    userName,
    stage,
    asPath,
    pathname,
    movie,
    quote,
    edit,
    notifications,
    removeNotificationsOnClick,
    notificationsQuantity,
    openNotificationsModal,
    closeNotificationsModal,
    isNotificationsModalOpen,
    setIsNewGlobal,
    isNewGlobal,
    page,
    hasMoreItems,
    getQuoteNotifications,
    setNotificationsQuantity,
    loadDataOnlyOnce,
  }
}
