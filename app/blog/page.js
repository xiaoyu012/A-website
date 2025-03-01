import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Blog from '../components/Blog'

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 sm:mt-20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl">
              技术博客
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-500 sm:mt-4">
              分享前端开发经验和最新技术动态
            </p>
          </div>
          <Suspense fallback={
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          }>
            <Blog />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
} 