import { MoviesTextarea } from './types'
import React from 'react'
import { useForm } from './useForm'
import { checkTypeAndError } from 'helpers'

const MoviesTextarea: React.FC<MoviesTextarea> = (props) => {
  const {
    register,
    inputReference,
    changeInputValue,
    isUndefinedError,
    setValueOnBlur,
  } = useForm(props.name)

  return (
    <div>
      <div className='flex flex-row justify-center mt-5'>
        {props.isEnglish && (
          <p
            className={`font-normal absolute text-lg text-borderGraySoft ml-60 nm:ml-72 lg:ml-r50 font-helveticaKa pt-3`}
          >
            Eng
          </p>
        )}
        {!props.isEnglish && (
          <p
            className={`font-light absolute text-lg text-borderGraySoft ml-60 nm:ml-72 lg:ml-r50 font-helveticaKa pt-3`}
          >
            ქარ
          </p>
        )}
        <div
          className={`
          ${checkTypeAndError({
            error: props.error,
            isUndefinedError,
            forMovieOrNewsFeedPage: true,
          })}
            border border-borderGraySoft rounded-md bg-transparent w-[19rem] nm:w-[22.375rem] lg:w-r55 h-r055
            `}
        >
          <textarea
            rows={4}
            {...register(props.name, {
              ...props.errors,
              onChange: changeInputValue,
            })}
            ref={inputReference}
            id={props.id}
            onBlur={setValueOnBlur}
            defaultValue={props.value && props.value}
            placeholder={props.placeholder}
            disabled={!!props.disabled}
            className={`font-helveticaKa placeholder-borderGraySoft text-white placeholder-4 placeholder-base pt-[10px] movies-input resize-none
          ${checkTypeAndError({
            error: props.error,
            isUndefinedError,
            forMovieOrNewsFeedPage: true,
          })}
           
          font-normal rounded-md text-lg bg-transparent pl-4 uploadImage nm:w-[22.375rem] sm:w-r55 h-16 outline-none pr-16 `}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default MoviesTextarea
