import { useStandardProfile } from './useStandardProfile'
import React from 'react'
import {
  AddNewEmailIcon,
  CreateNewEmail,
  LeftArrowWhiteIcon,
  PrimaryEmailIcon,
  ProfileInputError,
  ProfileInputTypeEmailAndPassword,
  ProfileInputTypeText,
  RightArrowWhiteIcon,
} from 'components'
import { FormProvider } from 'react-hook-form'
import Image, { ImageLoader } from 'next/image'
import Link from 'next/link'
import { EmailLayout } from '../EmailLayout'
import { UserNameAndPasswordMobile } from '../UserNameAndPasswordMobile'
import { CreateEmailAndUserNameMobile } from '../CreateEmailAndUserNameMobile'
import { ButtonAndCancelMobile } from '../ButtonAndCancelMobile'
const StandardProfile = () => {
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
    setRemovedEmails,
    setValue,
    setIsEditModeOn,
    primaryEmail,
    setPrimaryEmail,
    setDefaultUserEmails,
    name,
    validatePassword,
    setIsSubmitFormOpen,
    isSubmitFormOpen,
    removePasswordValue,
    isDataUpdated,
  } = useStandardProfile()

  return (
    <div className={' mt-10 sm:mt-0'}>
      <FormProvider {...form}>
        <div className='sm:w-r40 lgPlus:w-r65 min-h-r45'>
          <div className='flex flex-col items-center justify-start'>
            {stage === 'addEmail' && (
              <CreateNewEmail
                setUserEmails={setUserEmails}
                setDefaultUserEmails={setDefaultUserEmails}
              />
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(editInfo)}
          className='hidden sm:block sm:w-r40 lgPlus:w-r65 min-h-r45 overflow-x-hidden mb-72 sm:ml-2 md:ml-32 lg:ml-0'
        >
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

            <div className='w-full min-h-r35 bg-blackPurple rounded-xl mt-24 flex flex-col items-center overflow-x-hidden'>
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
              <div className='w-full flex justify-start ml-40'>
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

                  <div className='w-60 lgPlus:w-r32 h-0.1 bg-grayLine opacity-50 mt-14'></div>

                  <label
                    htmlFor='email'
                    className={`block font-normal text-base text-white mt-12
                  ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
                  >
                    {t('profile:email')}
                  </label>

                  <div className='flex items-center'>
                    <div className='absolute flex justify-center items-center mt-2 ml-52 lgPlus:ml-r30 z-20'>
                      <PrimaryEmailIcon />
                    </div>

                    <input
                      disabled={true}
                      id='email'
                      {...register('email')}
                      className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border border-greenInput
                    font-normal rounded text-base text-white bg-greenInput/20 backdrop-blur pl-4 mt-2 w-60  lgPlus:w-r32 h-r027 
                    outline-none pr-11 sm:pr-0`}
                    />
                    <p
                      className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm lgPlus:text-base text-white ml-10 cursor-default mt-2`}
                    >
                      {t('profile:primaryEmail')}
                    </p>
                  </div>

                  {userEmails &&
                    primaryEmail &&
                    userEmails.map((el, idx) => (
                      <EmailLayout
                        email={el.email}
                        emailFullObj={el}
                        key={el.email + '' + idx}
                        userEmails={userEmails}
                        setUserEmails={setUserEmails}
                        setRemovedEmails={setRemovedEmails}
                        setValue={setValue}
                        setIsEditModeOn={setIsEditModeOn}
                        primaryEmail={primaryEmail}
                        setPrimaryEmail={setPrimaryEmail}
                        isSubmitFormOpen={null}
                        setIsSubmitFormOpen={null}
                      />
                    ))}

                  <Link
                    href='/profile?stage=addEmail'
                    passHref
                    locale={locale}
                    className='flex justify-center items-center w-52 h-r027 border rounded-md mt-14 cursor-pointer'
                  >
                    <AddNewEmailIcon />
                    <p
                      className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white ml-4`}
                    >
                      {t('profile:addNewEmail')}
                    </p>
                  </Link>

                  <div className='w-r32 h-0.1 bg-grayLine opacity-50 mt-12'></div>

                  <label
                    htmlFor='disabled_password'
                    className={`block font-normal text-base text-white mt-12
                  ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
                  >
                    {t('profile:password')}
                  </label>

                  <div className='flex justify-start items-center mt-2'>
                    <input
                      disabled={true}
                      value={'examplePassword'}
                      type='password'
                      id='disabled_password'
                      name='disabled_password'
                      className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border-2
                  font-normal rounded text-base bg-inputGray pl-4 w-60 lgPlus:w-r32 h-r027 outline-none pr-11 sm:pr-0`}
                    />

                    {!isPasswordEditModeOn && (
                      <p
                        onClick={changePassword}
                        className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm lgPlus:text-base text-white ml-10 cursor-pointer`}
                      >
                        {t('profile:edit')}
                      </p>
                    )}
                  </div>

                  {isPasswordEditModeOn && (
                    <div>
                      <div className='w-r32 h-36 border border-grayLine/30 mt-10 rounded-md'>
                        <p
                          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white ml-10 mt-6`}
                        >
                          {t('profile:passwordsShouldContain')}
                        </p>

                        <div className='flex items-center mt-6 ml-10'>
                          <div
                            className={`w-1 h-1 rounded-full bg-roundedGray ${
                              watchPassword.length < 8
                                ? 'bg-roundedGray'
                                : 'bg-roundedGreen'
                            }`}
                          ></div>

                          <p
                            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-xs ${
                              watchPassword.length < 8
                                ? 'text-roundedGray'
                                : 'text-white'
                            } ml-2`}
                          >
                            {t('profile:minEight')}
                          </p>
                        </div>

                        <div className='flex items-center mt-2 ml-10'>
                          <div
                            className={`w-1 h-1 rounded-full bg-roundedGray ${
                              watchPassword.length > 15
                                ? 'bg-roundedGray'
                                : 'bg-roundedGreen'
                            }`}
                          ></div>

                          <p
                            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-xs  ${
                              watchPassword.length > 15
                                ? 'text-roundedGray'
                                : 'text-white'
                            } ml-2`}
                          >
                            {t('profile:maxFive')}
                          </p>
                        </div>
                      </div>

                      <ProfileInputTypeEmailAndPassword
                        name='password'
                        input='password'
                        errors={{
                          required: t('errors:password'),
                          minLength: {
                            value: 8,
                            message: t('errors:passwordMin'),
                          },
                          maxLength: {
                            value: 15,
                            message: t('errors:passwordMax'),
                          },
                        }}
                        id='password'
                        key='password'
                        isTypePassword={isTypePassword}
                        setIsTypePassword={setIsTypePassword}
                        placeholder={t('profile:password')}
                        labelContent={t('profile:password')}
                        error={errors.password}
                      />

                      <ProfileInputError errors={errors} name='password' />

                      <ProfileInputTypeEmailAndPassword
                        input='password'
                        name='confirm_password'
                        errors={{
                          required: t('errors:confirmPasswordReq'),
                          minLength: {
                            value: 8,
                            message: t('errors:passwordMin'),
                          },
                          maxLength: {
                            value: 15,
                            message: t('errors:passwordMax'),
                          },
                          validate: (val: string) => {
                            if (watchPassword !== val && val.length >= 8) {
                              return t('errors:passwordConfirmation')
                            }
                          },
                        }}
                        id='confirm_password'
                        key='confirm_password'
                        isTypePassword={isTypeConfirmPassword}
                        setIsTypePassword={setIsTypeConfirmPassword}
                        placeholder={t('profile:confirmNewPassword')}
                        labelContent={t('profile:confirmNewPassword')}
                        error={errors.confirm_password}
                      />

                      <ProfileInputError
                        errors={errors}
                        name='confirm_password'
                      />
                    </div>
                  )}
                  <div className='mb-28'></div>
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

        {/**mobile
         **/}

        <div className={'sm:hidden mobile'}>
          <form className='sm:hidden' onSubmit={handleSubmit(editInfo)}>
            {!stage && (
              <div className='mt-16 ml-8'>
                <Link href={'/news-feed'}>
                  <LeftArrowWhiteIcon />
                </Link>
              </div>
            )}
            <div
              className={`w-screen h-r38 ${
                stage && 'hidden'
              } bg-mbProfileBg mt-6 sm:hidden`}
            >
              <div className='flex flex-col justify-center items-center'>
                {currentUserImageUrl && (
                  <Image
                    priority={true}
                    unoptimized={true}
                    className='w-48 h-48 rounded-full object-fill mt-8'
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
                  } font-normal text-base text-white cursor-pointer mb-8 mt-4`}
                >
                  {t('profile:uploadNewPhoto')}
                </label>

                <UserNameAndPasswordMobile
                  name={name}
                  content={'userName'}
                  label={t('profile:username')}
                />

                <UserNameAndPasswordMobile
                  name={'••••••••••••'}
                  content={'password'}
                  label={t('profile:password')}
                />

                <div className='w-r18 nm:w-r21 flex justify-between items-center mt-8'>
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white cursor-default
                  `}
                  >
                    {t('profile:email')}
                  </p>
                  <Link
                    href={'profile?stage=showEmails'}
                    locale={locale}
                    passHref
                  >
                    <RightArrowWhiteIcon />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`${selectedImage ? 'flex' : 'hidden'} ${
                isDataUpdated && 'hidden'
              } justify-end`}
            >
              <p
                onClick={resetForm}
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white mt-6  h-r027 flex items-center cursor-pointer`}
              >
                {t('profile:cancel')}
              </p>

              <button
                type='submit'
                className={`bg-signInRed h-r027 w-[10rem] flex justify-center 
            items-center rounded-md mt-6 ml-8 cursor-pointer`}
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

          <div className={'sm:hidden'}>
            <div className={`mt-16 ml-8 ${stage !== 'showEmails' && 'hidden'}`}>
              <Link href={'/profile'} locale={locale}>
                <LeftArrowWhiteIcon />
              </Link>
            </div>
            <div
              className={`w-screen min-h-r38 ${
                stage !== 'showEmails' && 'hidden'
              } bg-mbProfileBg mt-6 sm:hidden ${isSubmitFormOpen && 'hidden'}`}
            >
              <form>
                <div className='flex justify-center items-center'>
                  <div className='w-r18 nm:w-r21 flex justify-between'>
                    <label
                      htmlFor='email'
                      className={`block font-normal text-sm text-white mt-8
                  ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
                    >
                      {t('profile:primaryEmail')}
                    </label>
                    <p className='cursor-default opacity-0'>.</p>
                  </div>
                </div>

                <div className='flex items-center w-full justify-center mt-4'>
                  <div className='absolute flex justify-center items-center mt-2 ml-r1605 sm:ml-r30 z-20'>
                    <PrimaryEmailIcon />
                  </div>

                  <input
                    disabled={true}
                    id='email'
                    {...register('email')}
                    className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border border-greenInput
                    font-normal rounded text-base text-white bg-greenInput/20 backdrop-blur pl-4 mt-2 w-r18 nm:w-r21 h-r027 
                    outline-none pr-11 sm:pr-0`}
                  />
                </div>
                <div className='flex justify-center items-center'>
                  <div className='w-r18 nm:w-r21 h-0.1 bg-grayLine mt-6'></div>
                </div>
              </form>

              {stage === 'showEmails' &&
                userEmails &&
                primaryEmail &&
                userEmails.map((el, idx) => (
                  <EmailLayout
                    email={el.email}
                    emailFullObj={el}
                    key={el.email + '' + idx}
                    userEmails={userEmails}
                    setUserEmails={setUserEmails}
                    setRemovedEmails={setRemovedEmails}
                    setValue={setValue}
                    setIsEditModeOn={setIsEditModeOn}
                    primaryEmail={primaryEmail}
                    setPrimaryEmail={setPrimaryEmail}
                    isSubmitFormOpen={isSubmitFormOpen}
                    setIsSubmitFormOpen={setIsSubmitFormOpen}
                  />
                ))}

              <div className={'flex w-full justify-center'}>
                <div className='flex w-r18 nm:w-r21 justify-between mt-14'>
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white`}
                  >
                    {t('profile:addNewEmailUpper')}
                  </p>
                  <p className='opacity-0 cursor-default'>.</p>
                </div>
              </div>
              <div className='flex w-screen justify-center'>
                <Link
                  href='/profile?stage=addEmail'
                  passHref
                  locale={locale}
                  className='flex justify-center items-center w-r18 nm:w-r21 h-9 border rounded-md mt-4 cursor-pointer'
                >
                  <AddNewEmailIcon />
                  <p
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-sm text-white ml-4`}
                  >
                    {t('profile:add')}
                  </p>
                </Link>
              </div>
              <div
                className={`w-20 h-20 ${stage !== 'showEmails' && 'hidden'}`}
              ></div>
            </div>
            <div
              className={`w-20 h-20 ${stage !== 'showEmails' && 'hidden'}`}
            ></div>
          </div>

          <form
            className={`sm:hidden  ${stage !== 'showEmails' && 'hidden'}`}
            onSubmit={handleSubmit(editInfo)}
          >
            <div className={`${!isSubmitFormOpen && 'hidden'}`}>
              <ButtonAndCancelMobile
                setIsSubmitFormOpen={setIsSubmitFormOpen}
              />
            </div>
          </form>

          <div>
            {stage === 'updateUsername' && (
              <CreateEmailAndUserNameMobile
                input='name'
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
                placeholder={t('profile:enterNewUserName')}
                labelContent={t('profile:enterNewUserName')}
                profile={'standard'}
              />
            )}
          </div>

          {stage === 'updatePassword' && (
            <form className={`sm:hidden`} onSubmit={handleSubmit(editInfo)}>
              <div className={`${isSubmitFormOpen && 'hidden'} mt-16`}>
                <div className={`sm:hidden bg-mbProfileBg w-screen`}>
                  {stage === 'updatePassword' && (
                    <div className='flex flex-col items-center'>
                      <div className='w-r18 nm:w-r21 h-36 bg-passwordWarningBg border border-grayLine/20 mt-10 rounded-md'>
                        <p
                          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal mt-6 text-base text-white ml-5 nm:ml-10`}
                        >
                          {t('profile:passwordsShouldContain')}
                        </p>

                        <div className='flex items-center mt-6 ml-5 nm:ml-10'>
                          <div
                            className={`w-1 h-1 rounded-full bg-roundedGray ${
                              watchPassword.length < 8
                                ? 'bg-roundedGray'
                                : 'bg-roundedGreen'
                            }`}
                          ></div>

                          <p
                            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-xs ${
                              watchPassword.length < 8
                                ? 'text-roundedGray'
                                : 'text-white'
                            } ml-2`}
                          >
                            {t('profile:minEight')}
                          </p>
                        </div>

                        <div className='flex items-center mt-2 ml-5 nm:ml-10'>
                          <div
                            className={`w-1 h-1 rounded-full bg-roundedGray ${
                              watchPassword.length > 15
                                ? 'bg-roundedGray'
                                : 'bg-roundedGreen'
                            }`}
                          ></div>

                          <p
                            className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-xs  ${
                              watchPassword.length > 15
                                ? 'text-roundedGray'
                                : 'text-white'
                            } ml-2`}
                          >
                            {t('profile:maxFive')}
                          </p>
                        </div>
                      </div>

                      <div className='flex flex-col w-screen justify-center items-center mt-10'>
                        <ProfileInputTypeEmailAndPassword
                          name='password'
                          input='password'
                          errors={{
                            required: t('errors:password'),
                            minLength: {
                              value: 8,
                              message: t('errors:passwordMin'),
                            },
                            maxLength: {
                              value: 15,
                              message: t('errors:passwordMax'),
                            },
                          }}
                          id='password'
                          key='password'
                          isTypePassword={isTypePassword}
                          setIsTypePassword={setIsTypePassword}
                          placeholder={t('profile:password')}
                          labelContent={t('profile:password')}
                          error={errors.password}
                        />

                        <div className='flex justify-center w-screen'>
                          <div className='flex justify-between w-r18 nm:w-r21'>
                            <ProfileInputError
                              errors={errors}
                              name='password'
                            />
                            <p className='opacity-0 cursor-default'>..</p>
                          </div>
                        </div>

                        <ProfileInputTypeEmailAndPassword
                          input='password'
                          name='confirm_password'
                          errors={{
                            required: t('errors:confirmPasswordReq'),
                            minLength: {
                              value: 8,
                              message: t('errors:passwordMin'),
                            },
                            maxLength: {
                              value: 15,
                              message: t('errors:passwordMax'),
                            },
                            validate: (val: string) => {
                              if (watchPassword !== val && val.length >= 8) {
                                return t('errors:passwordConfirmation')
                              }
                            },
                          }}
                          id='confirm_password'
                          key='confirm_password'
                          isTypePassword={isTypeConfirmPassword}
                          setIsTypePassword={setIsTypeConfirmPassword}
                          placeholder={t('profile:confirmNewPassword')}
                          labelContent={t('profile:confirmNewPassword')}
                          error={errors.confirm_password}
                        />

                        <div className='flex justify-center w-screen'>
                          <div className='flex justify-between w-r18 nm:w-r21'>
                            <ProfileInputError
                              errors={errors}
                              name='confirm_password'
                            />
                            <p className='opacity-0 cursor-default'>.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='h-10'></div>
                </div>

                <div className='flex w-screen justify-around mt-16'>
                  <Link
                    onClick={removePasswordValue}
                    href={'/'}
                    locale={locale}
                    className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white  h-r027 flex items-center cursor-pointer mr-20`}
                  >
                    {t('profile:cancel')}
                  </Link>

                  <button
                    type='button'
                    onClick={validatePassword}
                    className={`bg-signInRed h-r027 w-20 ml-4 flex justify-center items-center rounded-md cursor-pointer`}
                  >
                    <p
                      className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
                    >
                      {t('profile:add')}
                    </p>
                  </button>
                </div>
              </div>
              <div className={`${!isSubmitFormOpen && 'hidden'}`}>
                <ButtonAndCancelMobile
                  setIsSubmitFormOpen={setIsSubmitFormOpen}
                />
              </div>
            </form>
          )}

          <div className='w-20 h-20 hidden sm:block'></div>
        </div>
      </FormProvider>
    </div>
  )
}

export default StandardProfile
