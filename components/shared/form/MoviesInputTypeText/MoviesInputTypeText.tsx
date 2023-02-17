import { useForm } from './useForm'
import { MoviesInputTypeTextProps } from './types'
import React from 'react'
import { checkTypeAndError } from 'helpers'

const MoviesInputTypeText: React.FC<MoviesInputTypeTextProps> = (props) => {
  const {
    inputReference,
    register,
    changeInputValue,
    isUndefinedError,
    setValueOnBlur,
    edit,
  } = useForm(props.name)

  return (
    <div>
      <div className='flex flex-row items-center justify-center h-r027 mt-5'>
        {props.isEnglish && !props.budget && (
          <p
            className={`font-normal absolute text-lg text-borderGraySoft ml-60 nm:ml-72 lg:ml-r50 font-helveticaKa`}
          >
            Eng
          </p>
        )}
        {!props.isEnglish && !props.budget && (
          <p
            className={`font-light absolute text-lg text-borderGraySoft ml-60 nm:ml-72 lg:ml-r50 font-helveticaKa`}
          >
            ქარ
          </p>
        )}
        <input
          {...register(props.name, {
            ...props.errors,
            onChange: changeInputValue,
          })}
          id={props.id}
          placeholder={props.placeholder}
          type={`text`}
          defaultValue={edit && props.value && props.value}
          className={`font-helveticaKa placeholder-borderGraySoft text-white placeholder-4 placeholder-base movies-input
          ${checkTypeAndError({
            error: props.error,
            isUndefinedError,
          })}
           border border-borderGraySoft
          font-normal rounded-md text-lg bg-transparent pl-4 w-r19 nm:w-[22.375rem] lg:w-r55 h-r027 outline-none pr-16`}
          ref={inputReference}
          onBlur={setValueOnBlur}
        />
      </div>
    </div>
  )
}

export default MoviesInputTypeText
