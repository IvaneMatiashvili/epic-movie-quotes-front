import { useRouter } from 'next/router'

export const useIcons = () => {
  const { pathname } = useRouter()
  const whenPathNameNewsFeed =
    pathname.split('/')[1] === 'news-feed' ? '#E31221' : 'white'
  const whenPathNameMovies =
    pathname.split('/')[1] === 'movies' ? '#E31221' : 'white'

  return {
    whenPathNameNewsFeed,
    whenPathNameMovies,
  }
}
