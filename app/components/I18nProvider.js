'use client'

import { I18nextProvider } from 'react-i18next'

export default function I18nProvider({ children }) {
  return (
    <I18nextProvider>
      {children}
    </I18nextProvider>
  )
}