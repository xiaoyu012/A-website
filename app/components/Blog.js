'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getAllBlogPosts } from '../lib/blogPosts'

// 博客文章数据（由共享数据源提供）
const blogPosts = getAllBlogPosts();

// 博客分类
const categories = ['全部', 'React', 'JavaScript', 'CSS', 'TypeScript', 'Next.js', 'Node.js', '测试'];

// 资源列表
const resources = [
  {
    title: '前端资源',
    items: [
      { name: 'MDN Web 文档', link: 'https://developer.mozilla.org/zh-CN/' },
      { name: 'Web.dev', link: 'https://web.dev/' },
      { name: 'CSS-Tricks', link: 'https://css-tricks.com/' },
      { name: 'Can I Use', link: 'https://caniuse.com/' }
    ]
  },
  {
    title: '代码片段',
    items: [
      { name: 'React 组件模板', link: '/snippets/react-component' },
      { name: 'CSS 动画效果', link: '/snippets/css-animations' },
      { name: '常用 JavaScript 工具函数', link: '/snippets/js-utils' },
      { name: 'Next.js API 路由示例', link: '/snippets/nextjs-api' }
    ]
  },
  {
    title: '技术周刊',
    items: [
      { name: '前端精选周刊', link: '/newsletter/frontend-weekly' },
      { name: 'JavaScript 周报', link: '/newsletter/javascript-weekly' },
      { name: 'React 状态更新', link: '/newsletter/react-status' },
      { name: 'CSS 布局技巧', link: '/newsletter/css-layout' }
    ]
  },
  {
    title: '推荐书籍',
    items: [
      { name: '深入理解 JavaScript', link: '/books/javascript-deep-dive' },
      { name: 'React 设计模式与最佳实践', link: '/books/react-patterns' },
      { name: '现代 CSS 实战指南', link: '/books/modern-css' },
      { name: 'TypeScript 高级编程', link: '/books/typescript-programming' }
    ]
  }
];

// Add an export for featured blog posts that can be used in the home page
export function FeaturedBlogPosts() {
  const featuredPosts = blogPosts.slice(0, 3); // Get the three most recent blog posts
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Scroll animation detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 博客标题 */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">技术博客</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            最新前端技术与开发心得
          </p>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            分享我在前端开发领域的学习经验、技术见解和实用技巧
          </p>
        </div>
        
        {/* 特色博客文章 */}
        <div className={`mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {featuredPosts.map((post, index) => (
            <div 
              key={post.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${post.imageUrl})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-primary-500 text-white rounded-full">
                    {post.category}
                  </span>
                  <div className="mt-2 flex items-center text-white text-sm">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700 mt-auto"
                >
                  阅读全文
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-10 text-center transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            查看全部文章
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // 滚动动画检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // 文章过滤逻辑
  useEffect(() => {
    let results = blogPosts;
    
    // 按分类过滤
    if (activeCategory !== '全部') {
      results = results.filter(post => post.category === activeCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(
        post => 
          post.title.toLowerCase().includes(lowercasedTerm) || 
          post.excerpt.toLowerCase().includes(lowercasedTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    setFilteredPosts(results);
  }, [activeCategory, searchTerm]);
  
  return (
    <div id="blog" ref={sectionRef} className="py-8 sm:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 背景装饰 */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-secondary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* 博客标题 */}
        <div className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">技术博客</h2>
          <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            最新前端技术与开发心得
          </p>
          <p className="mt-3 sm:mt-4 max-w-3xl text-base sm:text-xl text-gray-600 mx-auto">
            分享我在前端开发领域的学习经验、技术见解和实用技巧
          </p>
        </div>

        {/* RSS 订阅 CTA */}
        <div className={`mt-6 sm:mt-8 transition-all duration-700 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-4 sm:px-6">
            <p className="text-gray-600 text-sm sm:text-base flex items-center">
              <span className="text-2xl mr-2" aria-hidden="true">📡</span>
              订阅 RSS/Atom 源，第一时间获取最新文章更新。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/rss.xml"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                RSS 订阅
              </a>
              <a
                href="/atom.xml"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                Atom 订阅
              </a>
            </div>
          </div>
        </div>

        {/* 搜索和分类过滤 */}
        <div className={`mt-6 sm:mt-10 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            {/* 搜索框 */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索文章..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <svg className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-700 mr-1">分类:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 博客文章列表 */}
        <div className={`mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 sm:h-52 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${post.imageUrl})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-full">
                      {post.category}
                    </span>
                    <div className="mt-2 flex items-center text-white text-sm">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700"
                    >
                      阅读全文
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-20 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">未找到相关文章</h3>
              <p className="mt-2 text-gray-500">请尝试其他搜索词或分类</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('全部');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                重置筛选
              </button>
            </div>
          )}
        </div>
        
        {/* 资源列表部分 */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">前端开发资源</h2>
            <p className="mt-2 text-gray-600">精选的前端开发资源，助您提升技能和效率</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resourceCategory, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary-600 mb-4">{resourceCategory.title}</h3>
                <ul className="space-y-2">
                  {resourceCategory.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a 
                        href={item.link} 
                        className="text-gray-700 hover:text-primary-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <a href={`/resources/${resourceCategory.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                    查看全部
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 订阅区域 */}
        <div className={`mt-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl shadow-xl overflow-hidden transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="py-12 px-6 sm:px-12 lg:py-16 lg:px-16 relative">
            {/* 装饰元素 */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white">
                订阅我的技术周刊
              </h3>
              <p className="mt-3 text-lg text-primary-100">
                获取最新的前端开发资讯、技术教程和独家内容，直接发送到您的邮箱
              </p>
              <div className="mt-8 sm:flex sm:justify-center">
                <div className="sm:flex-1 max-w-lg w-full">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="您的邮箱地址"
                      className="block w-full rounded-l-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-r-md border border-transparent bg-primary-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
                    >
                      订阅
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-primary-200">
                    我们尊重您的隐私。您可以随时取消订阅。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部导航区域 */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/blog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            查看所有文章
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 