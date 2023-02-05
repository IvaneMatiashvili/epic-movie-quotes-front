import { Props } from './types'
import { useLoginForm } from './useLoginForm'
import { InputTypeText, Error, GoogleSvg, FormLayout } from 'components'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import Link from 'next/link'

const LoginForm: React.FC<Props> = (props) => {
  const {
    setIsTypePassword,
    isTypePassword,
    t,
    form,
    handleSubmit,
    errors,
    locale,
    showFeedback,
    loginWithGoogle,
    register,
  } = useLoginForm()

  return (
    <FormLayout setHasScrollBar={props.setHasScrollBar} form='login'>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-24 sm:mt-0 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:logInToYourAccount')}
      </p>
      <p
        className={`font-light text-xs nm:text-sm sm:text-r009 mt-4 text-grayJourney ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:welcomeBack')}
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(showFeedback)}>
          <InputTypeText
            name='email'
            errors={{
              required: t('errors:email'),
              minLength: {
                value: 3,
                message: t('errors:nameMin'),
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
            }}
            id='password'
            key='password'
            isTypePassword={isTypePassword}
            setIsTypePassword={setIsTypePassword}
            placeholder={t('home:password')}
            labelContent={t('home:password')}
            error={errors.password}
          />

          <Error errors={errors} name='password' />
          <div className='flex justify-center'>
            <div
              className={`flex justify-between items-center w-r19 nm:w-r22 sm:w-r24 h-r027 mt-4`}
            >
              <div className='flex justify-between items-center'>
                <input
                  id='checkbox'
                  type='checkbox'
                  className='bg-white border-dark-20 rounded-sm outline-none w-5 h-5 cursor-pointer focus:ring-0 accent-pink-500 mr-2'
                  {...register('remember_me')}
                />
                <label
                  htmlFor='checkbox'
                  className={`font-light text-sm text-white cursor-pointer w- ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  }`}
                >
                  {t('home:rememberMe')}
                </label>
              </div>
              <Link
                href='?stage=forgotPassword'
                className={`font-light text-sm text-blueLogin underline cursor-pointer w- ${
                  locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                }`}
              >
                {t('home:forgotPassword')}
              </Link>
            </div>
          </div>

          <button
            type='submit'
            className={`bg-signInRed h-r027 w-r19 nm:w-r22 sm:w-r24 flex justify-center items-center rounded-md mt-4 cursor-pointer`}
          >
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
            >
              {t('home:signIn')}
            </p>
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
          href='?stage=register'
          className={`font-light text-sm mt-8 ml-2 text-blueLogin underline cursor-pointer ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('home:signUp')}
        </Link>
      </div>
    </FormLayout>
  )
}

export default LoginForm
