import { Props } from './types'
import { useForgotPasswordForm } from './useForgotPasswordForm'
import { InputTypeText, Error, FormLayout, LeftArrowSvg } from 'components'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import Link from 'next/link'

const ForgotPasswordForm: React.FC<Props> = (props) => {
  const { t, form, handleSubmit, errors, locale, showFeedback } =
    useForgotPasswordForm()

  return (
    <FormLayout setHasScrollBar={props.setHasScrollBar} form='forgotPassword'>
      <p
        className={`font-normal text-2xl sm:text-3xl text-white mt-40 sm:mt-0 ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:forgotPasswordSecond')}
      </p>
      <p
        className={`font-light text-r0081 sm:text-r0095 mt-4 text-grayJourney w-r24 text-center align-middle ${
          locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
        }`}
      >
        {t('home:enterTheEmail')}
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
            isTypePassword={null}
            setIsTypePassword={null}
          />

          <Error errors={errors} name='email' />

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
              {t('home:sendInstructions')}
            </p>
          </button>
        </form>
      </FormProvider>

      <Link
        href='?stage=login'
        passHref
        className='flex w-full justify-center items-center mt-8 '
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

export default ForgotPasswordForm
