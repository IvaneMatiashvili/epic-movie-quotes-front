import { Approve, ErrorSvg, Hide, Show } from 'components'
import { InputTypeEmailAndPasswordProps } from './types'
import { useForm } from './useForm'
import React from 'react'
import { checkTypeAndError } from 'helpers'

const ProfileInputTypeEmailAndPassword: React.FC<
  InputTypeEmailAndPasswordProps
> = (props) => {
  const {
    locale,
    inputReference,
    register,
    changePasswordType,
    isUndefinedError,
    changeInputValue,
  } = useForm(props.name)

  return (
    <div>
      <div className='flex justify-start'>
        <div className='w-r18 sm:w-r24'>
          <label
            htmlFor={props.id}
            className={`block font-normal text-base text-white sm:mt-6
        ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
          >
            {props.labelContent}
          </label>
        </div>
      </div>
      <div className='flex flex-row items-center justify-start h-14'>
        {(props.name === 'password' || props.name === 'confirm_password') &&
          props.isTypePassword && (
            <div
              className='absolute flex justify-center items-center mt-2 ml-60 nm:ml-72 sm:ml-48 lg:ml-r29 cursor-pointer'
              onClick={() =>
                changePasswordType(
                  props.isTypePassword!,
                  props.setIsTypePassword!
                )
              }
            >
              <Hide />
            </div>
          )}
        {(props.name === 'password' || props.name === 'confirm_password') &&
          !props.isTypePassword && (
            <div
              className='absolute flex justify-center items-center mt-2 ml-60 nm:ml-72 sm:ml-48 lg:ml-r29 cursor-pointer'
              onClick={() =>
                changePasswordType(
                  props.isTypePassword!,
                  props.setIsTypePassword!
                )
              }
            >
              <Show />
            </div>
          )}

        {!props.error && !isUndefinedError && (
          <div
            className={`absolute flex justify-center items-center mt-2
             ${
               props.input === 'email' || props.input === 'name'
                 ? 'ml-r1605 nm:ml-r19 sm:ml-0 sm:right-20'
                 : 'ml-r1605 nm:ml-r1905 sm:ml-r1305 lg:ml-r3005'
             }`}
          >
            <Approve />
          </div>
        )}

        {((props.error && !isUndefinedError) ||
          (props.error && isUndefinedError)) && (
          <div
            className={`absolute flex justify-center items-center mt-2
            ${
              props.input === 'email' || props.input === 'name'
                ? 'ml-r1605 nm:ml-r19 sm:ml-0 sm:right-20'
                : 'ml-r1605 nm:ml-r1905 sm:ml-r1305 lg:ml-r3005'
            }`}
          >
            <ErrorSvg />
          </div>
        )}

        <input
          {...register(props.name, {
            ...props.errors,
            onChange: changeInputValue,
          })}
          id={props.id}
          placeholder={props.placeholder}
          type={`${checkTypeAndError({
            name: props.name,
            isTypePassword: props.isTypePassword,
          })}`}
          className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border-2 ${checkTypeAndError(
            {
              error: props.error,
              isUndefinedError,
            }
          )}
          font-normal rounded text-base bg-inputGray pl-4 mt-2 w-r18 nm:w-r21 ${
            props.input === 'email' ? 'sm:w-r32' : 'sm:w-60'
          } lg:w-r32 h-r027 outline-none pr-11 sm:pr-14 lgPlus:pr-0`}
          ref={inputReference}
        />
      </div>
    </div>
  )
}

export default ProfileInputTypeEmailAndPassword
