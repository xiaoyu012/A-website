import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Open Source Banner */}
        <div className="mb-10 py-6 px-4 sm:px-6 rounded-xl bg-gray-800 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">开源项目</h3>
              <p className="text-gray-300 max-w-2xl">
                我热爱开源精神，并积极为开源社区贡献代码。查看我的GitHub以了解更多我正在参与的项目。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                我的GitHub
              </a>
              <a 
                href="/projects" 
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-600 text-base font-medium rounded-md text-white hover:bg-gray-700 transition-colors"
              >
                查看项目
              </a>
            </div>
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">小遇</span>
            </Link>
            <p className="text-gray-400 text-base">
              前端开发工程师 & 技术博主<br />
              专注于Web开发与用户体验设计
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">导航</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/" className="text-base text-gray-400 hover:text-white">首页</Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-400 hover:text-white">博客</Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-base text-gray-400 hover:text-white">关于我</Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-base text-gray-400 hover:text-white">项目</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-400 hover:text-white">联系我</Link>
                  </li>
                  <li>
                    <a href="/rss.xml" className="flex items-center text-base text-orange-300 hover:text-orange-200">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path d="M4 4a16 16 0 0116 16h-3a13 13 0 00-13-13V4z" />
                        <path d="M4 10a10 10 0 0110 10h-3a7 7 0 00-7-7v-3z" />
                      </svg>
                      RSS订阅
                    </a>
                  </li>
                  <li>
                    <a href="/atom.xml" className="flex items-center text-base text-blue-300 hover:text-blue-200">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 118-8 8.01 8.01 0 01-8 8zm0-4.5a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0112 15.5zm0-10a5.5 5.5 0 015.5 5.5.75.75 0 11-1.5 0 4 4 0 00-4-4 .75.75 0 010-1.5zm0 4a1.5 1.5 0 011.5 1.5.75.75 0 01-1.5 0 .5.5 0 00-.5-.5.75.75 0 010-1.5z" />
                      </svg>
                      Atom 订阅
                    </a>
                  </li>
                  <li>
                    <a href="https://ai.xiaoyulove.xyz" target="_blank" rel="noopener noreferrer" className="text-base text-primary-400 hover:text-primary-300">小遇 AI</a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">博客分类</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/blog?category=React" className="text-base text-gray-400 hover:text-white">React</Link>
                  </li>
                  <li>
                    <Link href="/blog?category=JavaScript" className="text-base text-gray-400 hover:text-white">JavaScript</Link>
                  </li>
                  <li>
                    <Link href="/blog?category=CSS" className="text-base text-gray-400 hover:text-white">CSS</Link>
                  </li>
                  <li>
                    <Link href="/blog?category=TypeScript" className="text-base text-gray-400 hover:text-white">TypeScript</Link>
                  </li>
                  <li>
                    <Link href="/blog?category=Next.js" className="text-base text-gray-400 hover:text-white">Next.js</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">资源</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/resources" className="text-base text-gray-400 hover:text-white">前端资源</a>
                  </li>
                  <li>
                    <a href="/snippets" className="text-base text-gray-400 hover:text-white">代码片段</a>
                  </li>
                  <li>
                    <a href="/newsletter" className="text-base text-gray-400 hover:text-white">技术周刊</a>
                  </li>
                  <li>
                    <a href="/books" className="text-base text-gray-400 hover:text-white">推荐书籍</a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">联系方式</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400">1918409681@qq.com</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400">北京，中国</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} 小遇. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
} 