/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useRef, useEffect } from 'react'

export function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title)
  useEffect(() => {
    document.title = `${title ? `${title} - CodeTree` : 'CodeTree'}`
  }, [title])

  useEffect(() => {
    return () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    }
  }, [])
}
