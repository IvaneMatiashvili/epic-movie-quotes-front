import { useCreateNewEmail } from './useCreateNewEmail'
import { ProfileInputError, ProfileInputTypeEmailAndPassword } from 'components'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import Link from 'next/link'
import { CreateNewEmailProps } from './types'
import { CreateEmailAndUserNameMobile } from '../CreateEmailAndUserNameMobile'

const CreateNewEmail: React.FC<CreateNewEmailProps> = (props) => {
  const { t, form, handleSubmit, errors, locale, showFeedback, stage } =
    useCreateNewEmail({
      setUserEmails: props.setUserEmails,
      setDefaultUserEmails: props.setDefaultUserEmails,
    })

  return (
    <>
      <div className='absolute top-r22 hidden sm:flex flex-col justify-center bg-blackBlueSoft z-30 w-r38 h-r22 rounded-xl'>
        <p
          className={`font-normal text-2xl sm:text-2xl text-white mt-8 ml-8 ${
            locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
          }`}
        >
          {t('profile:addNewEmail')}
        </p>

        <div className='w-[99.5%] h-0.1 bg-grayLineSoft mt-8'></div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(showFeedback)}>
            <div className='ml-8 mt-8'>
              <ProfileInputTypeEmailAndPassword
                input='email'
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
                placeholder={t('profile:enterNewEmail')}
                labelContent={t('profile:newEmail')}
                error={errors.email}
                isTypePassword={null}
                setIsTypePassword={null}
              />
              <ProfileInputError errors={errors} name='email' />
            </div>

            <div className='flex justify-end items-center w-r32 ml-8 mt-8'>
              <Link
                href='/profile'
                locale={locale}
                className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white  h-r027 flex items-center cursor-pointer`}
              >
                {t('profile:cancel')}
              </Link>

              <button
                type='submit'
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
          </form>
        </FormProvider>
      </div>

      <div>
        {stage === 'addEmail' && (
          <CreateEmailAndUserNameMobile
            setUserEmails={props.setUserEmails}
            setDefaultUserEmails={props.setDefaultUserEmails}
            input='email'
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
            placeholder={t('profile:enterNewEmail')}
            labelContent={t('profile:addNewEmail')}
            profile={'standard'}
          />
        )}
      </div>
    </>
  )
}

export default CreateNewEmail
