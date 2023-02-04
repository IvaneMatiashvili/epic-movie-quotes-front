import { getUserInfo } from 'services'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setUserData } from 'store'

export const useAuth = () => {
  const dispatch = useDispatch()

  useQuery('userInfo', getUserInfo, {
    onSuccess: (response) => {
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      dispatch(setUserData(response.data))
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  })
}
