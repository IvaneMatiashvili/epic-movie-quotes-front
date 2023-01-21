import { ErrorMessage } from '@hookform/error-message'
import { ProfileErrorProps } from './types'
import { useRouter } from 'next/router'
import React from 'react'

const ProfileInputError: React.FC<ProfileErrorProps> = (props) => {
  const { locale } = useRouter()
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => (
        <div className='flex justify-start'>
          <div className='w-r19 nm:w-r22 sm:w-r24'>
            <p
              className={`absolute mt-1 text-sm font-light text-redStar ${
                locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      )}
    />
  )
}

export default ProfileInputError
