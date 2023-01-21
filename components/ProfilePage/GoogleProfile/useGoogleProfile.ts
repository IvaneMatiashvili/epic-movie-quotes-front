import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { FormObj, RootState } from 'types'
import { editUserInfo, getUserInfo } from 'services'
import { setCookie } from 'cookies-next'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from 'store'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'

export const useGoogleProfile = () => {
  const userInformation = useSelector((state: RootState) => state.userData)
  const { mutate: submitForm } = useMutation(editUserInfo)
  const { locale } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useAuth()

  const [currentUserImageUrl, setCurrentImageUrl] = useState(null)
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const [isUserNameEditModeOn, setIsUserNameEditModeOn] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const form = useForm({
    defaultValues: {
      name: userInformation.name,
      email: '',
    },
    mode: 'all',
  })
  const { errors } = form.formState

  const resetForm = () => {
    form.reset()
    setIsEditModeOn(false)
    setIsUserNameEditModeOn(false)
    setSelectedImage(null)
    form.setValue('name', userInformation.name)
  }

  useQuery(['loginWithGoogle'], () => getUserInfo)
  const openEditMode = () => {
    setIsEditModeOn(true)
  }

  const editInfo = (data: FormObj) => {
    const formData = new FormData()

    formData.append('name', data['name'])
    selectedImage && formData.append('user_image', selectedImage!)

    submitForm(formData, {
      onSuccess: async (response) => {
        setCookie('userInfo', response?.data)
        setIsEditModeOn(false)
        setIsUserNameEditModeOn(false)
        dispatch(setUserData(response?.data))
      },
    })
  }

  const changeInputImage = (file: File) => {
    file && setSelectedImage(file as SetStateAction<any>)
  }
  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image as SetStateAction<any>)
      : setCurrentImageUrl(gandalfProfile as SetStateAction<any>)
    userInformation.emails &&
      form.setValue('email', userInformation.emails[0]?.email)
  }, [userInformation, form])

  return {
    t,
    errors,
    form,
    locale,
    register: form.register,
    isEditModeOn,
    setIsEditModeOn,
    openEditMode,
    handleSubmit: form.handleSubmit,
    resetForm,
    selectedImage,
    setSelectedImage,
    changeInputImage,
    editInfo,
    currentUserImageUrl,
    isUserNameEditModeOn,
    setIsUserNameEditModeOn,
  }
}
