import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export const useProfileInputTypeText = () => {
  const { register, setValue } = useFormContext()
  const { locale } = useRouter()
  const { t } = useTranslation()

  const [isUndefinedError, setUndefinedError] = useState(true)

  return {
    register,
    setValue,
    locale,
    isUndefinedError,
    setUndefinedError,
    t,
  }
}
