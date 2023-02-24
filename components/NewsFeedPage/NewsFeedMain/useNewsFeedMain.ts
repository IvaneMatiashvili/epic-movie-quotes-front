import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMutation, useQuery } from 'react-query'
import { getQuotes, searchQuotes } from 'services'
import { useEffect, useRef, useState } from 'react'
import { FormObj, Movies, Quote } from 'types'
import { useDebouncedCallback } from 'use-debounce'

export const useNewsFeedMain = () => {
  const { locale, query } = useRouter()
  const { stage } = query
  const { t } = useTranslation()

  const [page, setPage] = useState(0)
  const [movies, setMovies] = useState<Movies[]>([])
  const [hasMoreItems, setHasMoreItems] = useState(true)
  const [userQuotes, setUserQuotes] = useState<Quote[]>([])
  const [isInputEmpty, setIsInputEmpty] = useState(true)
  const [isFirstFocus, setIsFirstFocus] = useState(true)
  const [isWriteNewQuoteModalOpen, setIsWriteNewQuoteModalOpen] =
    useState(false)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNewQuoteCreated, setIsNewQuoteCreated] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false)

  const { mutate: submitForm } = useMutation(searchQuotes)

  const inputReference = useRef<HTMLInputElement>(null)
  useQuery([`userQuotes`, page], () => getQuotes(page), {
    onSuccess: (response) => {
      const newArr = [...userQuotes, ...response?.data[0]]
      setUserQuotes(newArr)

      if (response?.data[1] && isInputEmpty) {
        setMovies(response?.data[1])
      }

      if (response?.data[0]?.length === 0 && isInputEmpty) {
        setHasMoreItems(false)
      }
    },
    refetchOnWindowFocus: false,
    enabled: isInputEmpty,
  })

  const searchMovieOnChange = useDebouncedCallback(async (e) => {
    const data: FormObj = { search: e.target.value.trim() }
    setInputValue(e.target.value.trim())

    if (data['search'][0] === '@' || data['search'][0] === '#') {
      setIsFirstFocus(false)
      setIsInputEmpty(false)
      setHasMoreItems(false)
      submitForm(data, {
        onSuccess: async (response) => {
          setUserQuotes(response.data)
        },
      })
    } else {
      if (!isFirstFocus) {
        setUserQuotes([])
        setPage(0)
        setHasMoreItems(true)
        setIsInputEmpty(true)
        await getUserQuotes()
      }
    }
  }, 400)

  const getUserQuotes = async () => {
    setTimeout(() => {
      setPage((prev) => prev + 3)
    }, 400)
  }

  const closeSearchMobile = () => {
    setIsSearchMobileOpen(false)
  }

  const openSearch = () => {
    setIsSearchOpen(true)
  }
  const closeSearch = () => {
    setIsSearchOpen(false)
  }
  const openWriteNewQuoteModal = () => {
    setIsWriteNewQuoteModalOpen(true)
    setIsSearchOpen(false)
  }
  const closeWriteNewQuoteModal = () => {
    setIsWriteNewQuoteModalOpen(false)
  }

  useEffect(() => {
    if (isNewQuoteCreated) {
      setUserQuotes([])
      setPage(0)
      setHasMoreItems(true)
      setIsInputEmpty(true)
      setIsNewQuoteCreated(false)
    }
  }, [
    isNewQuoteCreated,
    setIsNewQuoteCreated,
    setUserQuotes,
    setPage,
    setHasMoreItems,
    setIsInputEmpty,
    getUserQuotes,
  ])

  useEffect(() => {
    console.log(isSearchOpen)
  }, [isSearchOpen])

  return {
    locale,
    t,
    getUserQuotes,
    userQuotes,
    page,
    hasMoreItems,
    movies,
    stage,
    searchMovieOnChange,
    inputReference,
    openSearch,
    closeSearch,
    isSearchOpen,
    inputValue,
    openWriteNewQuoteModal,
    closeWriteNewQuoteModal,
    isWriteNewQuoteModalOpen,
    setIsNewQuoteCreated,
    isSearchMobileOpen,
    setIsSearchMobileOpen,
    closeSearchMobile,
  }
}
