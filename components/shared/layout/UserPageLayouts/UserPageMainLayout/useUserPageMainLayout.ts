import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'types'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'

export const useUserPageMainLayout = () => {
  const { t } = useTranslation()
  const { locale, query, push, asPath } = useRouter()
  const { stage } = query
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
  const closeDropdownOnBlur = () => {
    if (isActiveDropdown) {
      setIsActiveDropdown(false)
    }

    if (stage === 'addEmail') {
      push('profile')
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
  }
}
