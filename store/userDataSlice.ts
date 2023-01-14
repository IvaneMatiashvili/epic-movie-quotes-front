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
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state = action.payload
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
