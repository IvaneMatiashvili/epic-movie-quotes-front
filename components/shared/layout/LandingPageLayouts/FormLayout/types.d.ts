import { SetState } from 'types'

export type FormProps = {
  children: JSX.Element[]
  setHasScrollBar: SetState<boolean>
  form: string
}
