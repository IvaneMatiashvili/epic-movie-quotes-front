import { TFunction } from 'i18next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { setStateType } from 'types'

export const useNavBar = () => {
  let t: TFunction<'translation', undefined>
  ;({ t } = useTranslation())
  const { locale }: { locale?: string | undefined } = useRouter()
  let [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false)

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
    setHasScrollBar: setStateType<boolean>,
    setIsRegisterOn: setStateType<boolean>
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
