import { useTranslation } from 'next-i18next'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { Emails, FormObj, RootState, SetStateFile, SetStateString } from 'types'
import { editUserInfo, getUserInfo, verifyUser } from 'services'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from 'store'
import { gandalfProfile } from 'public'
import { useAuth } from 'hooks'
import { checkErrorMessage, reactToastify } from 'helpers'

export const useStandardProfile = () => {
  const userInformation = useSelector((state: RootState) => state.userData)
  const queryClient = useQueryClient()

  const { mutate: submitForm } = useMutation(editUserInfo)

  const { locale, query, push } = useRouter()
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { stage, feedback, signature, paramId } = query

  useAuth()

  const [userName, setUserName] = useState('')
  const [currentUserImageUrl, setCurrentImageUrl] =
    useState<SetStateString>(null)
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const [isUserNameEditModeOn, setIsUserNameEditModeOn] = useState(false)
  const [isPasswordEditModeOn, setIsPasswordEditModeOn] = useState(false)

  const [selectedImage, setSelectedImage] = useState<SetStateFile>(null)

  const [isTypePassword, setIsTypePassword] = useState(true)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true)
  const [userEmails, setUserEmails] = useState<Array<Emails>>([])
  const [removedEmails, setRemovedEmails] = useState<string[]>([])
  const [primaryEmail, setPrimaryEmail] = useState<string | undefined>('')

  const [defaultUserEmails, setDefaultUserEmails] = useState<Array<Emails>>([])
  const [defaultPrimaryEmail, setDefaultPrimaryEmail] = useState()

  const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(false)
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  useQuery(
    ['verifyUser', `${feedback}&paramId=${paramId}&signature=${signature}`],
    () => verifyUser(`${feedback}&paramId=${paramId}&signature=${signature}`),
    {
      onError: () => {
        push('/404')
      },
      onSuccess: () => {
        queryClient.invalidateQueries('userInfo')
      },
      enabled: !!feedback && !!signature && !!paramId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  const form = useForm({
    defaultValues: {
      name: userInformation.name,
      email: '',
      password: '',
      confirm_password: '',
    },
    mode: 'all',
  })

  const { errors, isValid } = form.formState

  useQuery('userInfo', getUserInfo, {
    onSuccess: async (response) => {
      setDefaultPrimaryEmail(
        response?.data.emails.filter((el: Emails) => el.primary_email === 1)[0]
          .email
      )

      setDefaultUserEmails(response?.data.emails)

      if (removedEmails.length === 0) {
        setUserEmails(response?.data.emails)
      }

      if (!primaryEmail) {
        setPrimaryEmail(
          response?.data.emails.filter(
            (el: Emails) => el.primary_email === 1
          )[0].email
        )
        form.setValue(
          'email',
          response?.data.emails.filter(
            (el: Emails) => el.primary_email === 1
          )[0].email
        )
      }

      localStorage.setItem('userInfo', JSON.stringify(response.data))
      dispatch(setUserData(response?.data))
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const watchPassword = useWatch({
    control: form.control,
    name: 'password',
  })

  const watchPasswordConfirmation = useWatch({
    control: form.control,
    name: 'confirm_password',
  })

  const validatePassword = async () => {
    await form.trigger('password')
    await form.trigger('confirm_password')
    if (isValid) {
      setIsSubmitFormOpen(true)
    }
  }

  const removePasswordValue = () => {
    form.resetField('password')
    form.resetField('confirm_password')
  }

  const resetForm = async () => {
    await queryClient.invalidateQueries('userInfo')

    form.reset()
    setIsUserNameEditModeOn(false)
    setIsPasswordEditModeOn(false)
    setIsEditModeOn(false)
    setSelectedImage(null)

    form.setValue('name', userInformation.name)
    defaultPrimaryEmail && form.setValue('email', defaultPrimaryEmail)
    primaryEmail && setPrimaryEmail(defaultPrimaryEmail)
    setUserEmails(defaultUserEmails)
    setRemovedEmails([])
  }

  const openEditMode = () => {
    setIsEditModeOn(true)
  }

  const changePassword = () => {
    setIsEditModeOn(true)
    setIsPasswordEditModeOn(true)
  }

  const editInfo = (data: FormObj) => {
    const formData = new FormData()

    formData.append('name', data['name'])
    formData.append('email', data['email'])

    selectedImage && formData.append('user_image', selectedImage!)

    if (removedEmails.length > 0) {
      formData.append('emails', JSON.stringify(removedEmails))
    }

    if (data['password'].length > 0) {
      formData.append('password', data['password'])
      formData.append('password_confirmation', data['confirm_password'])
    }

    submitForm(formData, {
      onSuccess: async (response) => {
        localStorage.setItem('userInfo', JSON.stringify(response.data))

        setIsUserNameEditModeOn(false)
        setIsPasswordEditModeOn(false)
        setIsEditModeOn(false)

        dispatch(setUserData(JSON.stringify(response?.data)))

        await queryClient.invalidateQueries('userInfo')

        data['name'] !== userInformation.name &&
          reactToastify({
            content: t('profile:userNameChanged'),
            verifyEmail: false,
          })

        data['password'].length > 0 &&
          reactToastify({
            content: t('profile:passwordChanged'),
            verifyEmail: false,
          })

        selectedImage &&
          reactToastify({
            content: t('profile:userImageChanged'),
            verifyEmail: false,
          })

        removedEmails.length > 1 &&
          reactToastify({
            content: t('profile:emailsRemoved'),
            verifyEmail: false,
          })

        removedEmails.length === 1 &&
          reactToastify({
            content: t('profile:emailRemoved'),
            verifyEmail: false,
          })

        primaryEmail !== defaultPrimaryEmail &&
          reactToastify({
            content: t('profile:primaryEmailChanged'),
            verifyEmail: false,
          })

        setRemovedEmails([])

        setCurrentImageUrl(response.data.user_image)
        setSelectedImage(null)

        form.resetField('password')
        form.resetField('confirm_password')

        setIsDataUpdated(true)

        await push('profile')

        if (stage === 'updatePassword') {
          await push('profile?stage=updatePassword')
        }

        if (stage === 'showEmails') {
          await push('profile?stage=showEmails')
        }

        setIsSubmitFormOpen(false)
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
      : setCurrentImageUrl(gandalfProfile)

    if (userInformation.name) {
      form.setValue('name', userInformation.name)
      setUserName(userInformation.name)
    }

    if (watchPasswordConfirmation.length >= 8) {
      watchPassword === watchPasswordConfirmation
        ? form.clearErrors('confirm_password')
        : form.setError('confirm_password', {
            type: 'custom',
            message: t('errors:passwordConfirmation')!,
          })
    }
  }, [
    userInformation,
    form,
    t,
    watchPassword,
    watchPasswordConfirmation,
    setUserEmails,
    userInformation.emails,
    stage,
    userEmails,
  ])

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
    isTypePassword,
    setIsTypePassword,
    isTypeConfirmPassword,
    setIsTypeConfirmPassword,
    watchPassword,
    changePassword,
    isPasswordEditModeOn,
    userEmails,
    setUserEmails,
    removedEmails,
    setRemovedEmails,
    setValue: form.setValue,
    primaryEmail,
    setPrimaryEmail,
    setDefaultUserEmails,
    name: userName,
    validatePassword,
    setIsSubmitFormOpen,
    isSubmitFormOpen,
    removePasswordValue,
    isDataUpdated,
  }
}
