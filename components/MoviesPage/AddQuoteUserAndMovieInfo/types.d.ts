import { Genres, Movies } from 'types'

export type Props = {
  currentUserImageUrl: string
  userName: string
  currentMovie: Movies
  genres: Genres[]
}
