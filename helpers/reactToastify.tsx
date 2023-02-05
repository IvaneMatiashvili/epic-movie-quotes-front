import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Notification } from 'components'

export const reactToastify = (content: string, verifyEmail: boolean) => {
  toast(<Notification content={content} verifyEmail={verifyEmail} />, {
    closeButton: false,
  })
}
