import { Props } from './types'
import { useRegisterForm } from './useRegisterForm'
import {
  InputTypeText,
  Error,
  GoogleSvg,
  FormLayout,
  LoadingSpinner,
} from 'components'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import Link from 'next/link'

const RegisterForm: React.FC<Props> = (props) => {
  const {
    setIsTypePassword,
    isTypePassword,
    t,
    form,
    handleSubmit,
    errors,
    isTypeConfirmPassword,
    setIsTypeConfirmPassword,
    locale,
    watchPassword,
    showFeedback,
    loginWithGoogle,
    isLoading,
  } = useRegisterForm()

  return (
    <FormLayout setHasScrollBar={props.setHasScrollBar} form='register'>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-24 sm:mt-0 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:createAnAccount')}
      </p>
      <p
        className={`font-light sm:text-base mt-4 text-grayJourney ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:startYourJourney')}
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(showFeedback)}>
          <InputTypeText
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
              pattern: {
                value: /^[a-zა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                message: t('errors:useLowerCase'),
              },
            }}
            id='name'
            key='name'
            placeholder={t('home:namePlaceholder')}
            labelContent={t('home:name')}
            error={errors.name}
          />

          <Error errors={errors} name='name' />

          <InputTypeText
            name='email'
            errors={{
              required: t('errors:email'),
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: t('errors:emailValid'),
              },
            }}
            id='email'
            key='email'
            placeholder={t('home:emailPlaceholder')}
            labelContent={t('home:email')}
            error={errors.email}
          />

          <Error errors={errors} name='email' />

          <InputTypeText
            name='password'
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
              pattern: {
                value: /^[a-zა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                message: t('errors:useLowerCase'),
              },
            }}
            id='password'
            key='password'
            isTypePassword={isTypePassword}
            setIsTypePassword={setIsTypePassword}
            placeholder={t('home:passwordPlaceholder')}
            labelContent={t('home:password')}
            error={errors.password}
          />

          <Error errors={errors} name='password' />

          <InputTypeText
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
              pattern: {
                value: /^[a-zა-ჰ0-9_\-!@#$%^&*()+=.,/';"`~ [\]?:<>]*$/,
                message: t('errors:useLowerCase'),
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
            placeholder={t('home:confirmPassword')}
            labelContent={t('home:confirmPasswordPlaceholder')}
            error={errors.confirm_password}
          />
          <Error errors={errors} name='confirm_password' />

          <button
            type='submit'
            className={`bg-signInRed h-r027 w-r19 nm:w-r22 sm:w-r24 flex justify-center items-center rounded-md mt-8 cursor-pointer`}
          >
            {!isLoading && (
              <p
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
              >
                {t('home:getStarted')}
              </p>
            )}
            {isLoading && (
              <div className={'ml-2'}>
                <LoadingSpinner />
              </div>
            )}
          </button>
        </form>
      </FormProvider>

      <div
        onClick={loginWithGoogle}
        className='bg-softBlue border h-r027 w-r19 nm:w-r22 sm:w-r24 flex justify-center items-center rounded-md mt-4 cursor-pointer'
      >
        <div className='mr-2'>
          <GoogleSvg />
        </div>
        <p
          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
        >
          {t('home:singUpWithGoogle')}
        </p>
      </div>
      <div className='flex w-full justify-center items-center '>
        <p
          className={`font-light text-sm mt-8 text-grayJourney ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('home:alreadyHaveAnAccount')}
        </p>
        <Link
          href='?stage=login'
          className={`font-light text-sm mt-8 ml-2 text-blueLogin underline cursor-pointer ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('home:logIn')}
        </Link>
      </div>
    </FormLayout>
  )
}

export default RegisterForm
