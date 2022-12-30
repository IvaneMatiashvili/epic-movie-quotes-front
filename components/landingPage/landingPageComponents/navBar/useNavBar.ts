import { useRouter } from 'next/router'
import { useState } from 'react'
import { SetStateType } from 'types'
import { useTranslation } from 'next-i18next'

export const useNavBar = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  let [isActiveDropdown, setIsActiveDropdown] = useState(false)

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
  }
  const removeScrollbarAndOpenRegisterForm = (
    setHasScrollBar: SetStateType<boolean>,
    setIsRegisterOn: SetStateType<boolean>
  ) => {
    setHasScrollBar(false)
    setIsRegisterOn(true)
    localStorage.setItem('registerOn', 'true')
  }

  return {
    t,
    locale,
    isActiveDropdown,
    dropdownSwitcher,
    closeDropdownOnBlur,
    removeScrollbarAndOpenRegisterForm,
  }
}
