import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'types'

export const useProfilePageMain = () => {
  const userInformation = useSelector((state: RootState) => state.userData)

  const [googleId, setGoogleId] = useState('')

  useEffect(() => {
    userInformation && setGoogleId(userInformation.google_id)
  }, [userInformation, setGoogleId, googleId])

  return {
    googleId,
  }
}
