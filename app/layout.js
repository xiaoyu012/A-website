import './globals.css'
import { Inter } from 'next/font/google'
import { siteMetadata } from './lib/siteMetadata'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="zh">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 