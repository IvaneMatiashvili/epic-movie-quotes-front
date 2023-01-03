import { Props } from './types'
import { usePasswordResetForm } from './usePasswordResetForm'
import {
  InputTypeText,
  Error,
  FormLayout,
  LeftArrowSvg,
} from 'components/index'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import Link from 'next/link'

const PasswordResetForm: React.FC<Props> = (props) => {
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
  } = usePasswordResetForm()

  return (
    <FormLayout setHasScrollBar={props.setHasScrollBar} form='passwordReset'>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-40 sm:mt-0 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:newPassword')}
      </p>
      <p
        className={`font-light text-r0081 sm:text-r0095 mt-4 text-grayJourney w-r22 sm:w-r24 text-center align-middle ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:mustBeDifferent')}
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(showFeedback)}>
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
            <p
              className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white`}
            >
              {t('home:resetPassword')}
            </p>
          </button>
        </form>
      </FormProvider>

      <Link
        href='?stage=login'
        className='flex w-full justify-center items-center mt-12 '
      >
        <LeftArrowSvg />
        <p
          className={`font-light text-sm text-grayJourney ml-4 ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('home:backToLogin')}
        </p>
      </Link>
    </FormLayout>
  )
}

export default PasswordResetForm
