'use client'

import Head from 'next/head'
import { useTranslation } from 'react-i18next'

export default function SEO({ title, description }) {
  const { t } = useTranslation()
  
  const pageTitle = title || t('metadata.title')
  const pageDescription = description || t('metadata.description')
  
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  )
}