import { PropsType } from './types'
import React from 'react'
import { useRouter } from 'next/router'

const Background: React.FC<PropsType> = (props) => {
  const { locale } = useRouter()

  return (
    <div className='h-screen w-full'>
      <div
        className={`w-full bg-fixed bg-center bg-cover ${
          props.background === 'interstellar'
            ? 'bg-interstellar'
            : props.background === 'theRoyalTenenbaums'
            ? 'bg-theRoyalTenenbaums'
            : 'bg-lordOfTheRings'
        } bg-no-repeat bg-cover`}
      >
        <div
          className={`md:ml-40 sm:ml-16 ml-2 h-screen flex relative ${
            props.itemsPosition
          } ${props.top && 'top-72'} ${props.bottom && 'bottom-60'}`}
        >
          <div className='flex items-start'>
            <div className='sm:w-12 w-4 h-0.2 bg-white sm:mt-r013 mt-r006'></div>
            <div>
              {props.firstLine && (
                <p
                  className={`xl:text-5xl sm:text-xl md:text-2xl text-base ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-bold text-white sm:ml-6 ml-2`}
                >
                  {props.firstLine}
                </p>
              )}
              {props.secondLine && (
                <p
                  className={`xl:text-5xl sm:text-xl md:text-2xl text-base ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-bold text-white sm:ml-6 ml-2 sm:mt-4 mt-2`}
                >
                  {props.secondLine}
                </p>
              )}
              {props.thirdLine && (
                <p
                  className={`xl:text-5xl sm:text-xl md:text-2xl text-base ${
                    locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                  } font-bold text-white sm:ml-6 ml-2 sm:mt-4 mt-2`}
                >
                  {props.thirdLine}
                </p>
              )}
              <p
                className={`xl:text-3xl sm:text-lg md:text-xl text-sm ${
                  locale === 'en' ? 'font-helveticaEn' : 'font-helveticaKa'
                } font-normal text-softGray sm:ml-6 ml-2 sm:mt-8 mt-4`}
              >
                {props.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Background
