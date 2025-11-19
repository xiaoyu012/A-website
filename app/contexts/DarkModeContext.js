'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 从 localStorage 获取用户偏好
    const savedTheme = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let initialDark = false
    if (savedTheme !== null) {
      initialDark = savedTheme === 'true'
    } else {
      initialDark = prefersDark
    }
    
    setIsDark(initialDark)
    setIsLoaded(true)
    
    // 应用主题到 document
    if (initialDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    
    // 保存到 localStorage
    localStorage.setItem('darkMode', isDark)
    
    // 应用主题到 document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark, isLoaded])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const value = {
    isDark,
    toggleDarkMode,
    isLoaded
  }

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}