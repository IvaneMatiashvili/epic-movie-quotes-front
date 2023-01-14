import { hasCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getUser } from 'services'
import { deleteCookie } from 'cookies-next'
import { useQuery } from 'react-query'

export const useAuth = () => {
  const router = useRouter()
  const [hasUserId, setHasUserId] = useState(false)

  useQuery('userData', getUser, {
    onError: () => {
      if (router.pathname === '/news-feed') {
        deleteCookie('userInfo')
        router.push('/403')
      }
    },
    enabled: hasUserId,
  })

  useEffect(() => {
    if (hasCookie('user_id')) {
      setHasUserId(true)
    }
  }, [router])
}
