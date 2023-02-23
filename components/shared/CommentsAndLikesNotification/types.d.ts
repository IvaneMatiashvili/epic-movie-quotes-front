import { NewsFeedNotification, SetState } from 'types'

export type Props = {
  notification: NewsFeedNotification
  isNewGlobal: boolean
  setNotificationsQuantity: SetState<number>
}
