import { useRouter } from 'next/router'
import { useState } from 'react'
import { SetState } from 'types'
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
    setHasScrollBar: SetState<boolean>
  ) => {
    setHasScrollBar(false)
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
