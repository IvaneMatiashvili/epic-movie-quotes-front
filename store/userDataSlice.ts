import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import { UserInformation } from 'types'

const initialState: UserInformation = {
  value: getCookie('userInfo') ? JSON.parse(<string>getCookie('userInfo')) : {},
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
