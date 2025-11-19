'use client'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function useLanguageDirection() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language
    
    // Update HTML dir attribute for RTL languages (if needed in future)
    document.documentElement.dir = i18n.dir()
  }, [i18n.language])
  
  return {
    language: i18n.language,
    dir: i18n.dir()
  }
}