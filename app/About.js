'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  const [isInView, setIsInView] = useState(false)
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
  
  // 技能数据
  const skills = [
    { name: t('skills.javascript'), level: 95 },
    { name: t('skills.react'), level: 90 },
    { name: t('skills.htmlCss'), level: 88 },
    { name: t('skills.nodejs'), level: 85 },
    { name: t('skills.uiux'), level: 75 }
  ]
  
  // 经历数据
  const experiences = [
    {
      role: t('experience.senior.role'),
      company: t('experience.senior.company'),
      period: t('experience.senior.period'),
      description: t('experience.senior.description')
    },
    {
      role: t('experience.frontend.role'),
      company: t('experience.frontend.company'),
      period: t('experience.frontend.period'),
      description: t('experience.frontend.description')
    },
    {
      role: t('experience.intern.role'),
      company: t('experience.intern.company'),
      period: t('experience.intern.period'),
      description: t('experience.intern.description')
    }
  ]
  
  return (
    <div id="about" ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 背景装饰 */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-secondary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
        <div className={`lg:text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{t('about.title')}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t('about.subtitle')}
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-600 mx-auto">
            {t('about.description')}
          </p>
        </div>
        
        {/* 个人简介 */}
        <div className={`mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-8 items-center transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-600 p-1 rounded-xl shadow-xl">
              <div className="bg-white p-6 rounded-lg">
                <div className="mx-auto w-40 h-40 rounded-full mb-6 overflow-hidden">
                  {/* SVG Avatar */}
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="aboutPageAvatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="100" fill="url(#aboutPageAvatarGradient)" />
                    <circle cx="100" cy="85" r="40" fill="white" />
                    <circle cx="100" cy="180" r="60" fill="white" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-center text-gray-900">小遇</h3>
                <p className="text-center text-primary-600 font-medium">前端开发工程师 & 技术博主</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{t('hero.experience')}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>1918409681@qq.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t('hero.location')}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                
                <div className="mt-6">
                  <a href="https://ai.xiaoyulove.xyz" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                    {t('about.visitXiaoyuAI')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0 lg:col-span-7">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.whoAmI')}</h3>
            <div className="prose prose-lg text-gray-600">
              <p>
                {t('about.intro1')}
              </p>
              <p>
                {t('about.intro2')}
              </p>
              <p>
                {t('about.intro3')}
              </p>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('about.skills')}</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm font-medium text-primary-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: isInView ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 职业经历 */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 lg:text-center">{t('about.experience')}</h3>
          <div className="border-l-2 border-primary-500 ml-6">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative mb-10"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600"></div>
                <div className="ml-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h4 className="text-xl font-semibold text-gray-900">{exp.role}</h4>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block md:ml-4 mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-base text-gray-600 mt-1">{exp.company}</p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 开源贡献 */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 lg:text-center">{t('about.openSource')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 开源项目卡片 1 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <h4 className="text-lg font-semibold">{t('openSource.reactLibrary.title')}</h4>
                </div>
                <p className="text-gray-600 mb-4">{t('openSource.reactLibrary.description')}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">React</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">TypeScript</span>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">Storybook</span>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                  {t('common.viewProject')}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* 开源项目卡片 2 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <h4 className="text-lg font-semibold">{t('openSource.nextjsTemplates.title')}</h4>
                </div>
                <p className="text-gray-600 mb-4">{t('openSource.nextjsTemplates.description')}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Next.js</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">TailwindCSS</span>
                  <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">API</span>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                  {t('common.viewProject')}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* 开源项目卡片 3 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <svg className="w-8 h-8 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <h4 className="text-lg font-semibold">{t('openSource.vscodeExtension.title')}</h4>
                </div>
                <p className="text-gray-600 mb-4">{t('openSource.vscodeExtension.description')}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">VS Code</span>
                  <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">JavaScript</span>
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">工具</span>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                  {t('common.viewProject')}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* 下载简历 */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            {t('common.downloadResume')}
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
} 