import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { verifyUser } from 'services'
import { getCookie } from 'cookies-next'

export const useVerifyEmail = () => {
  const { query, push } = useRouter()
  const { feedback, signature, paramId } = query

  useQuery(
    ['verifyUser', `${feedback}&paramId=${paramId}&signature=${signature}`],
    () => verifyUser(`${feedback}&paramId=${paramId}&signature=${signature}`),
    {
      onError: () => {
        push('/404')
      },
      onSuccess: () => {
        if (getCookie('userInfo')) {
          push('profile?stage=emailActivated')
        } else {
          push('/?stage=emailActivated')
        }
      },
      enabled: !!feedback && !!signature && !!paramId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )
}
