'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import CommentsSection from './CommentsSection';

export default function BlogPostClient({ post, prevPost, nextPost }) {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    // Handle click outside to close share menu
    function handleClickOutside(event) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShareMenuOpen(false);
      }
    }

    if (shareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [shareMenuOpen]);

  useEffect(() => {
    // Configure marked to use highlight.js for syntax highlighting
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (err) {
            console.error('Highlighting error:', err);
          }
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true,
      headerIds: true,
      mangle: false
    });

    // Highlight code blocks after content is rendered
    document.querySelectorAll('pre code').forEach((block) => {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block);
      }
    });
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async (platform) => {
    const title = post.title;
    const url = currentUrl;
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: post.excerpt,
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      let shareUrl = '';
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'weibo':
          shareUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
          break;
      }
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    }
    setShareMenuOpen(false);
  };

  return (
    <>
      <main className="pt-16 pb-20 bg-white">
        {/* 文章头部区域 */}
        <div className="relative">
          {/* 文章头图 */}
          <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
            {post.imageUrl ? (
              <div className="h-full w-full" style={{
                backgroundImage: `url(${post.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-primary-500 to-secondary-600"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          </div>
          
          {/* 文章标题区域 */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-white/80 mb-2 gap-2">
                <span>{post.date}</span>
                <span className="hidden sm:inline-block mx-2">•</span>
                <span>{post.readTime}</span>
                <span className="hidden sm:inline-block mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 文章内容 */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 文章头部信息 */}
          <div className="mt-6 sm:mt-10 mb-6 sm:mb-8 border-b border-gray-200 pb-6 sm:pb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          
          {/* 文章主体内容 */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg prose-primary max-w-none">
            <div dangerouslySetInnerHTML={{ 
              __html: marked.parse(post.content, { 
                breaks: true,
                headerIds: true 
              }) 
            }} />
          </div>
          
          {/* 文章底部 */}
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-6 sm:mb-0">
                <h3 className="text-base font-semibold text-gray-900">标签</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      href={`/blog?tag=${tag}`} 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 sm:space-x-6 relative">
                {/* Share Button with Dropdown */}
                <div className="relative" ref={shareMenuRef}>
                  <button 
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="text-gray-500 hover:text-primary-600 transition-colors flex items-center text-sm"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    分享
                  </button>
                  
                  {/* Share Dropdown Menu */}
                  {shareMenuOpen && (
                    <div className="share-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                      {navigator.share && (
                        <button
                          onClick={() => handleShare('native')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          系统分享
                        </button>
                      )}
                      <button
                        onClick={handleCopyLink}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied ? '已复制！' : '复制链接'}
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('weibo')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.443h-.002zm8.751-8.312c-.336-.105-.562-.18-.387-.657.38-1.036.42-1.928.003-2.569-.778-1.189-2.916-1.125-5.37-.011 0 0-.771.35-.574-.286.378-1.244.321-2.283-.196-2.889-1.177-1.381-4.314-.037-7.01 3.006-2.01 2.267-3.18 4.675-3.18 6.816 0 4.015 5.161 6.454 10.203 6.454 6.625 0 11.036-3.848 11.036-6.903 0-1.848-1.555-2.889-3.525-1.961zm4.033-6.674c-1.405-1.561-3.481-2.15-5.41-1.621-.476.13-.783.602-.684 1.053.1.452.595.734 1.065.627 1.374-.375 2.87.043 3.89 1.158 1.022 1.14 1.315 2.631.876 3.992-.138.453.126.946.59 1.097.464.151.977-.097 1.114-.546.644-2.017.175-4.195-1.439-5.76h-.002zm-2.898 2.008c-.554-.617-1.291-.983-2.021-.955-.486.019-.87.422-.875.896-.002.474.378.878.862.9.243.009.485.139.69.37.207.23.28.489.245.719-.055.476.289.914.771.978.48.066.923-.265.98-.74.13-1.092-.485-2.165-1.652-3.17v.002z" />
                        </svg>
                        微博
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 作者信息 */}
            <div className="mt-8 flex items-center p-4 sm:p-6 bg-gray-50 rounded-lg">
              <img 
                src="/assets/avatar.jpg" 
                alt={post.author} 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-4 sm:mr-6 object-cover border-2 border-white shadow flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{post.author}</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">前端开发工程师，热爱分享与学习。专注于React、Next.js等前端技术栈。</p>
                <div className="mt-3 flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.032 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
        <CommentsSection slug={post.slug} postTitle={post.title} />
      </main>
      
      {/* 上一篇/下一篇导航 */}
      {(prevPost || nextPost) && (
        <div className="bg-gray-100 border-t border-gray-200 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group">
                  <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      上一篇
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </h3>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group">
                  <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center justify-end">
                      下一篇
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-right">
                      {nextPost.title}
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* 相关文章推荐 */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">你可能也感兴趣</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  React
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <Link href="/blog/react-18-concurrent-mode" className="block">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    React 18新特性详解 - Concurrent Mode的实际应用
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500">2023-10-15</span>
                  <Link href="/blog/react-18-concurrent-mode" className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  JavaScript
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <Link href="/blog/javascript-performance-optimization" className="block">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    JavaScript性能优化 - 实用技巧与最佳实践
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500">2023-08-30</span>
                  <Link href="/blog/javascript-performance-optimization" className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  Node.js
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <Link href="/blog/building-nodejs-cli-tools" className="block">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    使用 Node.js 构建强大的命令行工具 - 从入门到精通
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500">2023-12-10</span>
                  <Link href="/blog/building-nodejs-cli-tools" className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              查看所有文章
              <svg className="ml-2 -mr-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
