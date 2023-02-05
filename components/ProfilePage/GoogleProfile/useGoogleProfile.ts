import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Emails, FormObj, RootState, SetStateFile, SetStateString } from 'types'
import { editUserInfo, getUserInfo } from 'services'
import { setCookie } from 'cookies-next'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from 'store'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'

export const useGoogleProfile = () => {
  const userInformation = useSelector((state: RootState) => state.userData)
  const { mutate: submitForm } = useMutation(editUserInfo)
  const { locale, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useAuth()

  const [currentUserImageUrl, setCurrentImageUrl] =
    useState<SetStateString>(null)
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const [isUserNameEditModeOn, setIsUserNameEditModeOn] = useState(false)
  const [selectedImage, setSelectedImage] = useState<SetStateFile>(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'all',
  })
  const { errors, isSubmitting, isDirty } = form.formState

  const watchName = useWatch({
    control: form.control,
    name: 'name',
  })

  useQuery('userInfo', getUserInfo, {
    onSuccess: async (response) => {
      form.setValue('email', response.data.emails[0]?.email)
      form.setValue('name', response.data.name)
      setUserEmail(response.data.emails[0]?.email)

      localStorage.setItem('userInfo', JSON.stringify(response.data))
      dispatch(setUserData(response?.data))
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const resetForm = async () => {
    setIsEditModeOn(false)
    setIsUserNameEditModeOn(false)
    setSelectedImage(null)
    await form.setValue('name', userInformation.name)
    form.setValue('email', userInformation.emails[0]?.email)
  }

  const openEditMode = () => {
    setIsEditModeOn(true)
  }

  const editInfo = (data: FormObj) => {
    const formData = new FormData()

    if (watchName.length < 16) {
      formData.append('name', data['name'])
    }

    selectedImage && formData.append('user_image', selectedImage!)

    submitForm(formData, {
      onSuccess: async (response) => {
        setIsEditModeOn(false)
        setIsUserNameEditModeOn(false)
        setUserName(response?.data.name)

        setCookie('userInfo', response?.data.id)
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        dispatch(setUserData(response.data))

        setIsDataUpdated(true)
        form.setValue('name', response?.data?.name)
      },
    })
  }

  const changeInputImage = (file: File) => {
    file && setSelectedImage(file)
    setIsDataUpdated(false)
  }
  useEffect(() => {
    userInformation.user_image
      ? setCurrentImageUrl(userInformation.user_image)
      : setCurrentImageUrl(gandalfProfile)

    userInformation.name && setUserName(userInformation.name)
  }, [userInformation, form, userName, setUserName])

  useEffect(() => {
    if (userInformation) {
      if (
        userInformation?.name?.length > 15 &&
        userInformation?.name === watchName &&
        isSubmitting
      ) {
        form.setValue('name', '.   .')
      }
    }
  }, [userInformation, form, watchName, isSubmitting, isDirty])

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
    stage,
    name: userName,
    email: userEmail,
    isDataUpdated,
  }
}
