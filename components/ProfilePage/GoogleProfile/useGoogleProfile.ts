import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { FormObj, RootState, SetStateFileOrNull } from 'types'
import { editUserInfo, getUserInfo } from 'services'
import { setCookie } from 'cookies-next'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from 'store'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'
import { checkErrorMessage, reactToastify } from 'helpers'

export const useGoogleProfile = () => {
  const userInformation = useSelector((state: RootState) => state.userData)
  const { mutate: submitForm } = useMutation(editUserInfo)
  const { locale, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useAuth()

  const [currentUserImageUrl, setCurrentImageUrl] = useState<string>('')
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const [isUserNameEditModeOn, setIsUserNameEditModeOn] = useState(false)
  const [selectedImage, setSelectedImage] = useState<SetStateFileOrNull>(null)
  const [userName, setUserName] = useState('')
  const [defaultUserName, setDefaultUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isDataUpdated, setIsDataUpdated] = useState(false)
  const inputReference = useRef<HTMLInputElement>(null)
  const inputReferenceMobile = useRef<HTMLInputElement>(null)
  const [isUndefinedNamesError, setIsUndefinedNamesError] = useState(true)
  const [isFirstRender, setIsFirstRender] = useState(true)

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
      response?.data?.emails.length > 0 &&
        form.setValue('email', response?.data?.emails[0]?.email)
      form.setValue('name', response?.data?.name)
      response?.data?.emails.length > 0 &&
        setUserEmail(response?.data?.emails[0]?.email)
      setDefaultUserName(response?.data?.name)

      localStorage.setItem('userInfo', JSON.stringify(response?.data))
      dispatch(setUserData(response?.data))
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const resetForm = async () => {
    setIsEditModeOn(false)
    setIsUserNameEditModeOn(false)
    setSelectedImage(null)
    inputReference?.current?.form && inputReference?.current?.form.reset()
    inputReferenceMobile?.current?.form &&
      inputReferenceMobile?.current?.form.reset()

    setIsUndefinedNamesError(true)
    form.reset()
    await form.setValue('name', userInformation?.name)
    userInformation?.emails.length > 0 &&
      form.setValue('email', userInformation?.emails[0]?.email)
  }

  const createReactToast = (content: string) => {
    reactToastify(content, false)
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
        setUserName(response?.data?.name)

        setCookie('userInfo', response?.data?.id)
        localStorage.setItem('userInfo', JSON.stringify(response?.data))
        dispatch(setUserData(response.data))

        setIsDataUpdated(true)
        form.setValue('name', response?.data?.name)

        selectedImage && createReactToast(t('profile:userImageChanged'))
        setSelectedImage(null)

        setIsUndefinedNamesError(true)
        defaultUserName !== data['name'] &&
          createReactToast(t('profile:userNameChanged'))

        setDefaultUserName(response?.data?.name)
      },

      onError: (error: any) => {
        const setError = form.setError
        checkErrorMessage({
          setError,
          field: 'name',
          message: t('errors:nameExists'),
          error: error?.response?.data?.errors?.user_exist,
        })
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
      : setCurrentImageUrl(gandalfProfile.src)

    userInformation.name && setUserName(userInformation?.name)
  }, [userInformation, form, userName, setUserName])

  useEffect(() => {
    if (userInformation.user_image) {
      setIsFirstRender(false)
      setCurrentImageUrl(userInformation.user_image)
    } else {
      if (isFirstRender) {
        setCurrentImageUrl(gandalfProfile.src)
        setIsFirstRender(false)
      } else {
        return
      }
    }
  }, [isFirstRender, userInformation, setCurrentImageUrl, currentUserImageUrl])

  useEffect(() => {
    if (
      userInformation &&
      userInformation?.name?.length > 15 &&
      userInformation?.name === watchName &&
      isSubmitting
    ) {
      form.setValue('name', '.   .')
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
    inputReference,
    inputReferenceMobile,
    isUndefinedNamesError,
    setIsUndefinedNamesError,
  }
}
