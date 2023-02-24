import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Comments } from 'types'

export const useUserQuote = () => {
  const { locale, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()
  const [updatedUserComments, setUpdatedUserComments] = useState<Comments[]>([])

  return {
    locale,
    t,
    stage,
    updatedUserComments,
    setUpdatedUserComments,
  }
}
