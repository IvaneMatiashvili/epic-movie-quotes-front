import { Approve, ErrorSvg, Hide, Show } from 'components'
import { useForm } from './useForm'
import { InputTypeTextProps } from './types'
import React from 'react'

const InputTypeText: React.FC<InputTypeTextProps> = (props) => {
  const {
    locale,
    setValue,
    inputReference,
    register,
    changePasswordType,
    isUndefinedError,
    setUndefinedError,
  } = useForm()

  return (
    <>
      <label
        htmlFor={props.id}
        className={`block font-normal text-base text-white mt-6
        ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
      >
        {props.labelContent} <span className='text-redStar'>*</span>
      </label>
      <div className='flex flex-row items-center h-14'>
        {(props.name === 'password' || props.name === 'confirm_password') &&
          props.isTypePassword && (
            <div
              className='absolute flex justify-center items-center h-10 mt-2 right-r085 cursor-pointer'
              onClick={() =>
                props.isTypePassword &&
                props.setIsTypePassword &&
                changePasswordType(
                  props.isTypePassword,
                  props.setIsTypePassword
                )
              }
            >
              <Hide />
            </div>
          )}
        {(props.name === 'password' || props.name === 'confirm_password') &&
          !props.isTypePassword && (
            <div
              className='absolute flex justify-center items-center h-10 mt-2 right-r085 cursor-pointer'
              onClick={() =>
                props.isTypePassword &&
                props.setIsTypePassword &&
                changePasswordType(
                  props.isTypePassword,
                  props.setIsTypePassword
                )
              }
            >
              <Show />
            </div>
          )}

        {!props.error && !isUndefinedError && (
          <div className='absolute flex justify-center items-center h-10 mt-2 right-28 cursor-pointer'>
            <Approve />
          </div>
        )}

        {props.error && !isUndefinedError && (
          <div className='absolute flex justify-center items-center h-10 mt-2 right-28 cursor-pointer'>
            <ErrorSvg />
          </div>
        )}

        <input
          {...register(props.name, {
            ...props.errors,
            onChange: (e) => {
              e.target.value = e.target.value.trim()
              setUndefinedError(false)
              setValue(props.name, e.target.value.trim(), {
                shouldValidate: true,
              })
            },
          })}
          id={props.id}
          placeholder={props.placeholder}
          type={`${
            props.name === 'password' && props.isTypePassword
              ? 'password'
              : 'text'
          }`}
          className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border-2 ${
            !props.error && isUndefinedError
              ? 'border-borderGray'
              : (props.error && !isUndefinedError) ||
                (props.error && isUndefinedError)
              ? 'border-borderRed'
              : 'border-borderGreen'
          }
          font-normal rounded text-base bg-inputGray pl-4 mt-2 w-r24 h-r027 outline-none`}
          ref={inputReference}
        />
      </div>
    </>
  )
}

export default InputTypeText
