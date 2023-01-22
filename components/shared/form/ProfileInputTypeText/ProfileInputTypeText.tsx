import { Approve, ErrorSvg } from 'components'
import { useProfileInputTypeText } from './useProfileInputTypeText'
import { ProfileInputTypeTextProps } from './types'
import React from 'react'

const InputTypeText: React.FC<ProfileInputTypeTextProps> = (props) => {
  const { locale, register, isUndefinedError, t, changeInputValue } =
    useProfileInputTypeText()

  return (
    <div>
      <div className='flex justify-center'>
        <div className='sm:w-r32'>
          <label
            htmlFor={props.id}
            className={`block font-normal text-base text-white mt-6
        ${locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'}`}
          >
            {props.labelContent}
          </label>
        </div>
        <p
          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white ml-10  opacity-0 cursor-default`}
        >
          {t('profile:edit')}
        </p>
      </div>
      <div className='flex items-center justify-center h-14'>
        {!props.error && !isUndefinedError && props.isEditModeOn && (
          <div className='absolute flex justify-center items-center mt-2 ml-r1705 nm:ml-r2005 sm:ml-96'>
            <Approve />
          </div>
        )}

        {((props.error && !isUndefinedError && props.isEditModeOn) ||
          (props.error && isUndefinedError && props.isEditModeOn)) && (
          <div className='absolute flex justify-center items-center mt-2 ml-r1705 nm:ml-r2005 sm:ml-96'>
            <ErrorSvg />
          </div>
        )}

        <input
          {...register(props.name, {
            ...props.errors,
            onChange: changeInputValue,
          })}
          id={props.id}
          disabled={!props.isEditModeOn}
          className={`font-helveticaKa placeholder-gray-500 placeholder-4 placeholder-base border-2 ${
            (!props.error && isUndefinedError) || !props.isEditModeOn
              ? 'border-borderGray'
              : (props.error && !isUndefinedError) ||
                (props.error && isUndefinedError)
              ? 'border-borderRed'
              : 'border-borderGreen'
          }
          font-normal rounded text-base bg-inputGray pl-4 mt-2 w-r19 nm:w-r22 sm:w-r32 h-r027 outline-none pr-11 sm:pr-0`}
        />
        <p
          onClick={() => props.setIsEditModeOn && props.setIsEditModeOn(true)}
          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white ml-10 mt-2 cursor-pointer
                    ${props.isEditModeOn && 'hidden'} 
                  `}
        >
          {t('profile:edit')}
        </p>
        <p
          className={`
                  ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-normal text-base text-white ml-10 mt-2 cursor-default opacity-0
                    ${!props.isEditModeOn && 'hidden'} 
                  `}
        >
          {t('profile:edit')}
        </p>
      </div>
    </div>
  )
}

export default InputTypeText
