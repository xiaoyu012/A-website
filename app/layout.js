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
import { siteMetadata } from './lib/siteMetadata'
import { DarkModeProvider } from './contexts/DarkModeContext'

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
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}${siteMetadata.feeds?.rss ?? '/rss.xml'}`,
      'application/atom+xml': `${siteMetadata.siteUrl}${siteMetadata.feeds?.atom ?? '/atom.xml'}`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LayoutContent>
        {children}
      </LayoutContent>
    </I18nextProvider>
    <html lang="zh">
      <body className={inter.className}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  )
} 