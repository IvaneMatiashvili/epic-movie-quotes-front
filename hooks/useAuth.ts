import { useRouter } from 'next/router'
import { getUserInfo } from 'services'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useQuery } from 'react-query'
import { AUTH_ROUTES } from '../constants'
import { useDispatch } from 'react-redux'
import { setUserData } from 'store'

export const useAuth = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useQuery('userInfo', getUserInfo, {
    onError: () => {
      if (AUTH_ROUTES.test(router.pathname)) {
        getCookie('userInfo') && deleteCookie('userInfo')
        getCookie('userInfo') && deleteCookie('userInfo')
        router.push('/403')
      }
    },
    onSuccess: (response) => {
      setCookie('userInfo', response?.data)
      dispatch(setUserData(response?.data))
    },
  })
}
