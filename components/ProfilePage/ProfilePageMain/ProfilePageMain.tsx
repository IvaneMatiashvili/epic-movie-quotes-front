import { GoogleProfile } from '../GoogleProfile'
import { UserPageMainLayout } from 'components/index'
import React from 'react'

const ProfilePageMain = () => {
  return (
    <UserPageMainLayout>
      <GoogleProfile />
    </UserPageMainLayout>
  )
}
export default ProfilePageMain
