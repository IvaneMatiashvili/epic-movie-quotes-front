export type ResetPassword = {
  url: string
  data: object
}

export type Broadcast = {
  socketId: string
  channelName: string
  callback: Function
}
