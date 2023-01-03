import { useRouter } from 'next/router'
import { SetState } from 'types'

export const useLayout = () => {
  const { push } = useRouter()

  const returnScrollbarAndCloseLoginForm = async (
    setHasScrollBar: SetState<boolean>
  ) => {
    setHasScrollBar(true)
    await push('/')
  }

  return {
    returnScrollbarAndCloseLoginForm,
  }
}
