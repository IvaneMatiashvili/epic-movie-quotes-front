import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import { UserInformation } from 'types'

const user: UserInformation = getCookie('userInfo')
  ? JSON.parse(<string>getCookie('userInfo'))
  : ''

const initialState: UserInformation = {
  name: user?.name,
  user_id: user?.user_id,
  google_id: user?.google_id,
  user_image: user?.user_image,
  emails: user?.emails,
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name
      state.user_id = action.payload.user_id
      state.google_id = action.payload.google_id
      state.user_image = action.payload.user_image
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
