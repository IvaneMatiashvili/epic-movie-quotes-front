import { Props } from './types'

export const checkErrorMessage = (props: Props) => {
  if (props.error) {
    props.setError(props.field, { type: 'custom', message: props.message })
  }
}
