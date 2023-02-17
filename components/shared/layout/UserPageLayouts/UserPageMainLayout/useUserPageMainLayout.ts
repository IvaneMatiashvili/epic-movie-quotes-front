import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { RootState, SetState } from 'types'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'

export const useUserPageMainLayout = (
  setIsSetBackground: SetState<boolean> | undefined
) => {
  const { t } = useTranslation()
  const { locale, query, push, asPath, pathname } = useRouter()
  const { stage, movie, quote, edit } = query
  useAuth()

  const [currentUserImageUrl, setCurrentImageUrl] = useState('')
  const [userName, setUserName] = useState('')
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)

  const userInformation = useSelector((state: RootState) => state.userData)

  const dropdownSwitcher = () => {
    if (!isActiveDropdown) {
      setIsActiveDropdown(true)
    } else {
      setIsActiveDropdown(false)
    }
  }
  const closeDropdownOnBlur = async () => {
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
  }
}
