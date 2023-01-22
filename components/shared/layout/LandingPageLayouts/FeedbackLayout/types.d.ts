import { SetState } from 'types'

export type FeedbackProps = {
  children: JSX.Element[]
  setHasScrollBar: SetState<boolean>
  feedback: string
}
