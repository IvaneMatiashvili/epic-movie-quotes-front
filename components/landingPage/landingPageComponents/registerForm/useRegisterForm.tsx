import { setStateType } from 'types'

export const useRegisterForm = () => {
  const returnScrollbarAndCloseRegisterForm = (
    setHasScrollBar: setStateType<boolean>,
    setIsRegisterOn: setStateType<boolean>
  ) => {
    setHasScrollBar(true)
    setIsRegisterOn(false)
    localStorage.setItem('registerOn', 'false')
  }
  return {
    returnScrollbarAndCloseRegisterForm,
  }
}
