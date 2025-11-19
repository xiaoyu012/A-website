'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'
import { I18nextProvider } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import zhTranslations from '../lib/locales/zh.json'
import enTranslations from '../lib/locales/en.json'

// Initialize i18n
const i18n = require('i18next').createInstance({
  lng: 'zh',
  fallbackLng: 'zh',
  debug: false,
  resources: {
    zh: { translation: zhTranslations },
    en: { translation: enTranslations }
  },
  interpolation: { escapeValue: false }
})

// Initialize language detector
i18n.use(LanguageDetector)

const inter = Inter({ subsets: ['latin'] })

function LayoutContent({ children }) {  
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: '小遇 - 前端开发工程师与技术博主',
  description: '我是小遇，一名专注于现代Web技术的前端开发工程师和技术博主，拥有1年开发经验，分享前端开发经验和最新技术动态',
}

export default function RootLayout({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LayoutContent>
        {children}
      </LayoutContent>
    </I18nextProvider>
  )
} 