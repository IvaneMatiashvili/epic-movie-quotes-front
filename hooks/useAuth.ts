import { getUserInfo } from 'services'
import { setCookie } from 'cookies-next'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setUserData } from 'store'

export const useAuth = () => {
  const dispatch = useDispatch()

  useQuery('userInfo', getUserInfo, {
    onSuccess: (response) => {
      setCookie('userInfo', response?.data)
      dispatch(setUserData(response?.data))
    },
  })
}
