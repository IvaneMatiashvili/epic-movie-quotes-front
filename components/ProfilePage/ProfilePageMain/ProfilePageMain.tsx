import { GoogleProfile } from '../GoogleProfile'
import { UserPageMainLayout } from 'components'
import React from 'react'
import { StandardProfile } from '../standardProfile'
import { useProfilePageMain } from './useProfilePageMain'

const ProfilePageMain = () => {
  const { googleId } = useProfilePageMain()
  return (
    <UserPageMainLayout>
      {googleId && googleId ? <GoogleProfile /> : <StandardProfile />}
    </UserPageMainLayout>
  )
}
export default ProfilePageMain
