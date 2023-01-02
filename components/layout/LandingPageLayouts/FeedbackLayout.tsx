import React from 'react'
import { useLayout } from './useLayout'
import { FeedbackProps } from './types'

const FeedbackLayout: React.FC<FeedbackProps> = (props) => {
  const { returnScrollbarAndCloseLoginForm } = useLayout()
  return (
    <div
      className={`fixed w-screen z-30 h-screen bg-blurBlack/30 backdrop-blur flex justify-center items-center overflow-hidden`}
    >
      <div
        className={`w-full sm:w-r37 h-screen ${
          props.feedback === 'checkYourEmail'
            ? 'sm:h-r30'
            : props.feedback === 'passwordRecover'
            ? 'sm:h-r32'
            : 'sm:h-r24'
        } absolute z-40 bg-darkBlue sm:bg-softBlue sm:rounded-xl flex flex-col sm:justify-center items-center`}
      >
        <div className='flex flex-col mt-24 sm:mt-0 rounded-xl justify-center items-center w-r19 nm:w-r22 sm:w-full h-r28 sm:h-full bg-whiteGray sm:bg-softBlue sm:rounded-xl'>
          {props.children}
        </div>
      </div>
      <div
        className='w-screen h-screen absolute z-30 bg-transparent'
        onClick={() => returnScrollbarAndCloseLoginForm(props.setHasScrollBar)}
      ></div>
    </div>
  )
}

export default FeedbackLayout
