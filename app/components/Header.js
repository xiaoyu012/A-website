'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text text-transparent transition-all duration-300 transform hover:scale-105`}>小遇</span>
            </Link>
          </div>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} font-medium hover:text-primary-500 transition-colors`}>
              首页
            </Link>
            <Link href="/blog" className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} font-medium hover:text-primary-500 transition-colors`}>
              博客
            </Link>
            <Link href="/about" className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} font-medium hover:text-primary-500 transition-colors`}>
              关于我
            </Link>
            <Link href="/projects" className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} font-medium hover:text-primary-500 transition-colors`}>
              项目
            </Link>
            <a href="https://ai.xiaoyulove.xyz" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? 'text-primary-600' : 'text-primary-600'} font-medium hover:text-primary-400 transition-colors`}>
              小遇 AI
            </a>
            <a
              href="/rss.xml"
              className="flex items-center text-sm font-semibold text-orange-600 border border-orange-200 px-3 py-1 rounded-full hover:bg-orange-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18a2 2 0 11-4 0 2 2 0 014 0z" />
                <path d="M4 4a16 16 0 0116 16h-3a13 13 0 00-13-13V4z" />
                <path d="M4 10a10 10 0 0110 10h-3a7 7 0 00-7-7v-3z" />
              </svg>
              <span className="ml-1">RSS订阅</span>
            </a>
            <Link href="/contact" className="btn-primary">
              联系我
            </Link>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
            >
              <span className="sr-only">打开菜单</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-primary-500 hover:bg-gray-50">
            首页
          </Link>
          <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-primary-500 hover:bg-gray-50">
            博客
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-primary-500 hover:bg-gray-50">
            关于我
          </Link>
          <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-primary-500 hover:bg-gray-50">
            项目
          </Link>
          <a href="https://ai.xiaoyulove.xyz" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-400 hover:bg-gray-50">
            小遇 AI
          </a>
          <a href="/rss.xml" className="block px-3 py-2 rounded-md text-base font-medium text-orange-600 border border-orange-200 bg-orange-50/60 hover:bg-orange-100">
            RSS订阅
          </a>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
            联系我
          </Link>
        </div>
      </div>
    </header>
  )
} 