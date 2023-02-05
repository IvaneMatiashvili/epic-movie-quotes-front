import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Notification } from 'components'
import { ReactToastify } from './types'

export const reactToastify = ({ content, verifyEmail }: ReactToastify) => {
  toast(<Notification content={content} verifyEmail={verifyEmail} />, {
    closeButton: false,
  })
}
