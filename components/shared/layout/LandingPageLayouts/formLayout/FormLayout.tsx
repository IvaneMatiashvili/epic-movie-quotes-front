import React from 'react'
import { useLayout } from 'hooks'
import { FormProps } from './types'

const FormLayout: React.FC<FormProps> = (props) => {
  const { returnScrollbarAndCloseLoginForm } = useLayout()
  return (
    <div
      className={`fixed w-screen z-30 h-screen bg-blurBlack/30 backdrop-blur flex justify-center items-center overflow-hidden`}
    >
      <div
        className={`w-full sm:w-r37 h-screen ${
          props.form === 'login'
            ? 'sm:h-r40'
            : props.form === 'forgotPassword'
            ? 'sm:h-r28'
            : props.form === 'passwordReset'
            ? 'sm:h-r37'
            : 'sm:h-r55'
        } absolute z-40 bg-darkBlue sm:bg-softBlue sm:rounded-xl flex flex-col sm:justify-center items-center`}
      >
        {props.children}
      </div>
      <div
        className='w-screen h-screen absolute z-30 bg-transparent'
        onClick={() => returnScrollbarAndCloseLoginForm(props.setHasScrollBar)}
      ></div>
    </div>
  )
}

export default FormLayout
