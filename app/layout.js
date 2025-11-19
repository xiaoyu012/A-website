import './globals.css'
import { Inter } from 'next/font/google'
import { DarkModeProvider } from './contexts/DarkModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '小遇 - 前端开发工程师与技术博主',
  description: '我是小遇，一名专注于现代Web技术的前端开发工程师和技术博主，拥有1年开发经验，分享前端开发经验和最新技术动态',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  )
} 