import { SetState } from 'types'

export type Props = {
  setHasScrollBar: SetState<boolean>
}

export interface FormObj {
  [key: string]: string
}
