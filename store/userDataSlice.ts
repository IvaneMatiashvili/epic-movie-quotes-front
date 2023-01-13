import { createSlice } from '@reduxjs/toolkit'
import { SetUserState } from './types'
import { getCookie } from 'cookies-next'

const initialState: SetUserState = {
  value: {
    name: (getCookie('name') as string) || '',
    userId: (getCookie('userId') as string) || '',
    googleId: (getCookie('googleId') as string) || '',
  },
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value.name = action.payload.name
      state.value.userId = action.payload.user_id
      state.value.googleId = action.payload.google_id
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
