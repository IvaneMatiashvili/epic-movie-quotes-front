import { createSlice } from '@reduxjs/toolkit'
import { UserInformation } from './types'
import { getCookie } from 'cookies-next'

const initialState: UserInformation = {
  value: getCookie('userInfo')
    ? (JSON.parse(getCookie('userInfo') as string) as object)
    : {},
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
