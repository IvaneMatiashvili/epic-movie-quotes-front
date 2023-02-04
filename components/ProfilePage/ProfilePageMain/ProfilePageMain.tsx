import { GoogleProfile } from '../GoogleProfile'
import { UserPageMainLayout } from 'components'
import React from 'react'
import { StandardProfile } from '../standardProfile'

const ProfilePageMain = () => {
  return (
    <UserPageMainLayout>
      <GoogleProfile />
      {/*
      <StandardProfile />
*/}
    </UserPageMainLayout>
  )
}
export default ProfilePageMain
