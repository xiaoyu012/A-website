'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function CTA() {
  const [isInView, setIsInView] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  
  // 滚动动画检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])
  
  // 鼠标移动效果
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return
    
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
  
  return (
    <div 
      ref={sectionRef} 
      className="bg-gradient-to-r from-primary-500 to-secondary-600 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 动态光效跟随鼠标 */}
      <div 
        className="absolute pointer-events-none w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"
        style={{ 
          left: `${mousePosition.x - 144}px`, 
          top: `${mousePosition.y - 144}px`,
          transition: 'left 0.5s ease-out, top 0.5s ease-out'
        }}
      />
      
      {/* 浮动圆形装饰 */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-white opacity-5 rounded-full animate-float"></div>
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-white opacity-5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              <span className="block relative overflow-hidden">
                <span className={`block transition-all duration-700 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                  订阅我的技术周刊
                </span>
              </span>
              <span className="block text-primary-100 relative overflow-hidden">
                <span className={`block transition-all duration-700 delay-300 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                  获取前端开发最新动态和教程
                </span>
              </span>
            </h2>
            <p className={`mt-4 text-lg text-primary-100 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              每周我会精选前端开发领域的最新资讯、实用技巧和深度教程，帮助你保持技术敏锐度，提升开发技能。不错过任何重要的技术更新和实践经验。
            </p>
            
            <div className={`mt-8 transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="px-5 py-3 border-0 text-base rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-300 flex-1"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 sm:mt-0 sm:ml-0 mt-2"
                >
                  订阅
                </button>
              </div>
              <p className="mt-3 text-sm text-primary-200">
                我尊重您的隐私，您可以随时取消订阅。
              </p>
            </div>
          </div>
          
          <div className={`mt-10 lg:mt-0 relative transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">订阅内容包括：</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">最新前端框架和库的更新动态</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">实用的开发技巧和最佳实践</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">性能优化和用户体验提升指南</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">深度技术文章和案例分析</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">独家教程和资源推荐</span>
                </li>
              </ul>
              
              <div className="mt-6 flex space-x-4">
                <Link href="/blog" className="flex-1 text-center py-2 px-4 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
                  浏览博客
                </Link>
                <Link href="/contact" className="flex-1 text-center py-2 px-4 bg-primary-800 text-white font-medium rounded-md hover:bg-primary-900 transition-colors">
                  联系我
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 动画波浪背景 */}
      <div className="relative h-20 bg-gradient-to-r from-primary-500 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="wave-1 w-full h-full bg-white opacity-5"></div>
          <div className="wave-2 w-full h-full bg-white opacity-5"></div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-20 text-white relative z-10">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
} 