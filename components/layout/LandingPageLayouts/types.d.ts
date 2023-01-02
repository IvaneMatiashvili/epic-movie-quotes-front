import { SetState } from 'types'

export type FormProps = {
  children: JSX.Element[]
  setHasScrollBar: SetState<boolean>
  form: string
}

export type FeedbackProps = {
  children: JSX.Element[]
  setHasScrollBar: SetState<boolean>
  feedback: string
}
