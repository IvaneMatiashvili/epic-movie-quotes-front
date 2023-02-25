import { NewsFeedNotification, SetState } from 'types'

export type CommentsAndLikesNotificationProps = {
  notification: NewsFeedNotification
  isNewGlobal: boolean
  setNotificationsQuantity: SetState<number>
  newNotifications: NewsFeedNotification[]
}
