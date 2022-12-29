import { PropsType } from './types'
import React from 'react'
import { useRegisterForm } from './useRegisterForm'

const RegisterForm: React.FC<PropsType> = (props) => {
  const { returnScrollbarAndCloseRegisterForm } = useRegisterForm()
  return (
    <>
      <div
        className={`fixed w-screen z-30 h-screen bg-blurBlack/30 backdrop-blur flex justify-center items-center`}
      >
        <div className='w-r37 h-r44 absolute z-40 bg-softBlue'></div>
        <div
          className='w-screen h-screen absolute z-30 bg-transparent'
          onClick={() =>
            returnScrollbarAndCloseRegisterForm(
              props.setHasScrollBar,
              props.setIsRegisterOn
            )
          }
        ></div>
      </div>
    </>
  )
}

export default RegisterForm
