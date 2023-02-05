import { CreateEmailAndChangePasswordMobileProps } from './types'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useCreateEmailAndUserNameMobile } from './useCreateEmailAndUserNameMobile'
import {
  LeftArrowWhiteIcon,
  ProfileInputError,
  ProfileInputTypeEmailAndPassword,
} from 'components'
import Link from 'next/link'
import { ButtonAndCancelMobile } from '../ButtonAndCancelMobile'

const CreateEmailAndUserNameMobile: React.FC<
  CreateEmailAndChangePasswordMobileProps
> = (props) => {
  const {
    t,
    form,
    handleSubmit,
    errors,
    locale,
    showFeedback,
    validateEmail,
    isSubmitFormOpen,
    setIsSubmitFormOpen,
    stage,
    isLoading,
  } = useCreateEmailAndUserNameMobile({
    setUserEmails: props.setUserEmails,
    setDefaultUserEmails: props.setDefaultUserEmails,
    name: props.name,
  })

  return (
    <div className={'sm:hidden'}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(showFeedback)}>
          <div
            className={`
      ${isSubmitFormOpen && 'hidden'} 
        `}
          >
            <div
              className={`${
                props.profile === 'google' ? 'mt-r065' : 'mt-16'
              } ml-8`}
            >
              <Link
                href={
                  stage === 'updateUsername'
                    ? '/profile'
                    : '/profile?stage=showEmails'
                }
                locale={locale}
              >
                <LeftArrowWhiteIcon />
              </Link>
            </div>
            <div
              className={`w-screen ${
                props.profile === 'google' ? 'h-60' : 'h-44'
              } bg-mbProfileBg mt-6 sm:hidden flex items-center justify-center rounded-xl`}
            >
              <p className={`absolute text-white `}>{props.name === 'name'}</p>
              <div
                className={`flex flex-col justify-start items-start items-center ${
                  props.profile === 'google' ? 'mt-2' : 'mt-[-1rem]'
                } `}
              >
                <ProfileInputTypeEmailAndPassword
                  input={props.input}
                  name={props.name}
                  errors={props.errors}
                  id={props.id}
                  key={props.id}
                  placeholder={props.placeholder}
                  labelContent={props.labelContent}
                  error={props.name === 'name' ? errors.name : errors.email}
                />
                <div className='flex justify-center w-screen'>
                  <div className='flex justify-between w-r18 nm:w-r21'>
                    <ProfileInputError errors={errors} name={props.name} />

                    <p className='opacity-0 cursor-default'>.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex w-screen justify-around mt-32'>
              <Link
                href={
                  props.name === 'name'
                    ? '/profile'
                    : '/profile?stage=showEmails'
                }
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
                onClick={validateEmail}
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
              isLoading={isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateEmailAndUserNameMobile
