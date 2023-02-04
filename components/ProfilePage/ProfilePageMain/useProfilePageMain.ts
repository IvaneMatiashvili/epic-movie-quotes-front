import { useState } from 'react'

export const useProfilePageMain = () => {
  const [isAddEmailModalOn, setIsAddEmailModalOn] = useState(false)

  return {
    isAddEmailModalOn,
    setIsAddEmailModalOn,
  }
}
