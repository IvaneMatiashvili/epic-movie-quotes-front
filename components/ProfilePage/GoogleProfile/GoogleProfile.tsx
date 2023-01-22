import { useGoogleProfile } from './useGoogleProfile'
import React from 'react'
import { ProfileInputError, ProfileInputTypeText } from 'components'
import { FormProvider } from 'react-hook-form'
import Image, { ImageLoader } from 'next/image'

const GoogleProfile = () => {
  const {
    t,
    locale,
    form,
    errors,
    isEditModeOn,
    handleSubmit,
    resetForm,
    selectedImage,
    changeInputImage,
    editInfo,
    currentUserImageUrl,
    setIsUserNameEditModeOn,
    isUserNameEditModeOn,
    openEditMode,
    register,
  } = useGoogleProfile()

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(editInfo)} className='w-r65 h-r45'>
        <div className='w-96 h-20 flex flex-col justify-center'>
          <p
            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-xl text-white ml-16`}
          >
            {t('profile:myProfile')}
          </p>
          <p className='opacity-0 mt-2 cursor-default'>.</p>
        </div>
        <div className='flex flex-col items-center justify-start'>
          {currentUserImageUrl && (
            <Image
              priority={true}
              unoptimized={true}
              className='w-48 h-48 absolute rounded-full object-fill'
              height={100}
              width={100}
              loader={(() => currentUserImageUrl) as ImageLoader}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage as File)
                  : currentUserImageUrl
              }
              alt={'user image'}
            />
          )}

          <div className='w-full h-r35 bg-blackPurple rounded-xl mt-24 flex flex-col items-center'>
            <input
              type='file'
              id='uploadImage'
              multiple
              accept='image/*'
              className='hidden'
              onChange={(event) => {
                if (event.target.files)
                  changeInputImage(event?.target?.files[0])
              }}
            />
            <label
              htmlFor='uploadImage'
              onClick={openEditMode}
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white mt-28 cursor-pointer`}
            >
              {t('profile:uploadNewPhoto')}
            </label>
            <div className='w-full flex justify-start ml-96'>
              <div>
                <ProfileInputTypeText
                  name='name'
                  errors={{
                    required: t('errors:name'),
                    minLength: {
                      value: 3,
                      message: t('errors:nameMin'),
                    },
                    maxLength: {
                      value: 15,
                      message: t('errors:nameMax'),
                    },
                  }}
                  id='name'
                  key='name'
                  labelContent={t('profile:username')}
                  error={errors.name}
                  setIsEditModeOn={setIsUserNameEditModeOn}
                  isEditModeOn={isUserNameEditModeOn}
                />

                <ProfileInputError errors={errors} name='name' />

                <div className='w-r32 h-0.1 bg-grayLine opacity-50 mt-14'></div>

                <label
                  htmlFor='email'
                  className={`block font-normal text-base text-white mt-12
                  ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
                >
                  {t('profile:email')}
                </label>

                <input
                  disabled={true}
                  id='email'
                  {...register('email')}
                  className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border-2
                  font-normal rounded text-base bg-inputGray pl-4 mt-2 w-r19 nm:w-r22 sm:w-r32 h-r027 outline-none pr-11 sm:pr-0`}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            isEditModeOn || isUserNameEditModeOn ? 'flex' : 'hidden'
          } justify-end `}
        >
          <p
            onClick={resetForm}
            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white mt-8  h-r027 flex items-center cursor-pointer`}
          >
            {t('profile:cancel')}
          </p>

          <button
            type='submit'
            className={`bg-signInRed h-r027 w-r19 nm:w-r22 sm:w-40 flex justify-center 
            items-center rounded-md mt-8 ml-8 cursor-pointer`}
          >
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
            >
              {t('profile:saveChanges')}
            </p>
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default GoogleProfile
