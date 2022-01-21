import { useMediaQuery } from 'react-responsive'

export const useMediaQueries = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023.98px)' })
  const isLaptopOrBigger = useMediaQuery({ query: '(min-width: 1024px)' })
  return { isTabletOrMobile, isLaptopOrBigger }
}
