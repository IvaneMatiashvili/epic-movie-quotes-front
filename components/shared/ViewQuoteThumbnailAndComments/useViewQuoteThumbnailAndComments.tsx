import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { storeLikes } from 'services'
import { FormObj, Likes, Quote, RootState } from 'types'
import { useSelector } from 'react-redux'
import { gandalfProfile } from 'public'

export const useViewQuoteThumbnailAndComments = (
  likes: Likes[],
  quoteId: string,
  currentQuote: Quote,
  quoteUserId: number
) => {
  const userInformation = useSelector((state: RootState) => state.userData)

  const { locale } = useRouter()

  const currentUserLike = likes?.filter(
    (el) => el?.user?.id === userInformation.id
  )

  const [hasLike, setHasLike] = useState(currentUserLike?.length > 0)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [likesCounter, setLikesCounter] = useState(0)

  const [newLikeId, setNewLikeId] = useState<undefined | string>(
    currentUserLike ? currentUserLike[0]?.id : undefined
  )

  const { mutate: submitForm } = useMutation(storeLikes)
  const queryClient = useQueryClient()

  const setLikeOrRemove = () => {
    if (hasLike) {
      setHasLike(false)
      setLikesCounter((prev) => prev - 1)
      setNewLikeId(undefined)
    } else {
      if (newLikeId) {
        setLikesCounter((prev) => prev - 1)
        setHasLike(false)
      } else {
        setLikesCounter((prev) => prev + 1)
        setHasLike(true)
      }
    }
    const data: FormObj = {}
    data['quote_id'] = quoteId
    data['user_id'] = quoteUserId.toString()

    if (newLikeId) {
      data['like_id'] = newLikeId
    }
    submitForm(data, {
      onSuccess: async (response) => {
        setNewLikeId(response?.data?.id)
        setNewLikeId(response?.data?.id)
        await queryClient.invalidateQueries('quote')
      },
    })
  }

  useEffect(() => {
    if (isFirstLoad && Object.keys(currentQuote).length) {
      setHasLike(currentUserLike && currentUserLike?.length > 0)
      setNewLikeId(currentUserLike[0]?.id)
      setIsFirstLoad(false)
    }
  }, [
    setHasLike,
    hasLike,
    currentUserLike,
    isFirstLoad,
    setIsFirstLoad,
    currentQuote,
  ])

  return {
    hasLike,
    setLikeOrRemove,
    likesCounter,
    locale,
    defaultUserImage: gandalfProfile.src,
  }
}
