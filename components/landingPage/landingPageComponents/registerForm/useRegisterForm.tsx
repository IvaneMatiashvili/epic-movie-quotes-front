export const useRegisterForm = () => {
  const returnScrollbarAndCloseRegisterForm = (
    setHasScrollBar: (arg0: boolean) => void,
    setIsRegisterOn: (arg0: boolean) => void
  ) => {
    setHasScrollBar(true)
    setIsRegisterOn(false)
    localStorage.setItem('registerOn', 'false')
  }
  return {
    returnScrollbarAndCloseRegisterForm,
  }
}
