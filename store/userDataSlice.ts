import { createSlice } from '@reduxjs/toolkit'
import { UserInformation } from 'types'

const user: UserInformation =
  typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : ''

const initialState: UserInformation = {
  name: user?.name,
  id: user?.id,
  google_id: user?.google_id,
  user_image: user?.user_image,
  emails: user?.emails,
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, id, google_id, user_image } = action.payload
      state.name = name
      state.id = id
      state.google_id = google_id
      state.user_image = user_image
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
