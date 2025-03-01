import { Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './About'
import { FeaturedBlogPosts } from './components/Blog'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Suspense fallback={
          <div className="py-16 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        }>
          <FeaturedBlogPosts />
        </Suspense>
        <CTA />
      </main>
      <Footer />
    </div>
  )
} 