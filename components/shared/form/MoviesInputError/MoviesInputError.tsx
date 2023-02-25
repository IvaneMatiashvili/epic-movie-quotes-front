import { ErrorMessage } from '@hookform/error-message'
import { MoviesErrorProps } from './types'
import { useRouter } from 'next/router'
import React from 'react'

const MoviesInputError: React.FC<MoviesErrorProps> = (props) => {
  const { locale } = useRouter()

  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => (
        <div className='flex justify-start'>
          <div>
            <p
              className={`absolute mt-0.2 text-xs font-light text-redStar ${
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

export default MoviesInputError
