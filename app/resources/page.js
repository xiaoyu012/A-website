import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ResourcesPage() {
  // 资源列表
  const resources = [
    {
      title: '前端资源',
      description: '精选前端开发文档、工具和学习平台',
      items: [
        { name: 'MDN Web 文档', description: 'Web技术的权威参考', link: 'https://developer.mozilla.org/zh-CN/' },
        { name: 'Web.dev', description: 'Google推出的现代web开发指南', link: 'https://web.dev/' },
        { name: 'CSS-Tricks', description: 'CSS技巧和教程网站', link: 'https://css-tricks.com/' },
        { name: 'Can I Use', description: '浏览器兼容性查询工具', link: 'https://caniuse.com/' },
        { name: 'DevDocs', description: '综合API文档', link: 'https://devdocs.io/' },
        { name: 'React官方文档', description: 'React框架官方指南', link: 'https://reactjs.org/docs/getting-started.html' },
        { name: '前端工具集', description: '实用前端开发工具推荐', link: '/resources/frontend-tools' },
        { name: 'UI设计资源', description: '界面设计灵感和资源', link: '/resources/ui-design' }
      ]
    },
    {
      title: '代码片段',
      description: '可复用的代码片段，提高开发效率',
      items: [
        { name: 'React 组件模板', description: '常用React组件结构和模式', link: '/snippets/react-component' },
        { name: 'CSS 动画效果', description: '实用CSS动画示例', link: '/snippets/css-animations' },
        { name: 'JavaScript 工具函数', description: '常用JS辅助函数集合', link: '/snippets/js-utils' },
        { name: 'Next.js API 路由示例', description: 'Next.js后端API实现样例', link: '/snippets/nextjs-api' },
        { name: 'TypeScript 类型定义', description: '常见TS类型声明示例', link: '/snippets/typescript-types' },
        { name: 'Tailwind 组件片段', description: 'Tailwind CSS组件代码', link: '/snippets/tailwind-components' },
        { name: 'React Hooks 示例', description: '自定义Hooks和使用案例', link: '/snippets/react-hooks' },
        { name: '性能优化代码', description: '前端性能优化技巧', link: '/snippets/performance' }
      ]
    },
    {
      title: '技术周刊',
      description: '定期更新的技术文章和资讯合集',
      items: [
        { name: '前端精选周刊', description: '每周前端热点内容汇总', link: '/newsletter/frontend-weekly' },
        { name: 'JavaScript 周报', description: 'JS生态最新动态', link: '/newsletter/javascript-weekly' },
        { name: 'React 状态更新', description: 'React相关技术更新和教程', link: '/newsletter/react-status' },
        { name: 'CSS 布局技巧', description: 'CSS布局和设计新方法', link: '/newsletter/css-layout' },
        { name: '前端工程化动态', description: '构建工具和工程实践更新', link: '/newsletter/engineering' },
        { name: '浏览器技术新知', description: '浏览器特性和API更新', link: '/newsletter/browser-tech' },
        { name: 'Web性能观察', description: '性能优化策略和案例分析', link: '/newsletter/web-performance' },
        { name: '前端安全通报', description: 'Web安全最佳实践和漏洞防范', link: '/newsletter/security' }
      ]
    },
    {
      title: '推荐书籍',
      description: '精选前端开发学习书籍推荐',
      items: [
        { name: '深入理解JavaScript', description: '全面解析JS语言核心概念', link: '/books/javascript-deep-dive' },
        { name: 'React设计模式与最佳实践', description: 'React开发进阶指南', link: '/books/react-patterns' },
        { name: '现代CSS实战指南', description: 'CSS新特性和实用技巧', link: '/books/modern-css' },
        { name: 'TypeScript高级编程', description: 'TS高级特性和类型系统', link: '/books/typescript-programming' },
        { name: '图解HTTP', description: 'HTTP协议详解', link: '/books/illustrated-http' },
        { name: '你不知道的JavaScript', description: 'JS进阶知识详解', link: '/books/you-dont-know-js' },
        { name: 'Web性能权威指南', description: '全面的前端性能优化策略', link: '/books/high-performance-websites' },
        { name: '精通CSS', description: 'CSS深度学习教程', link: '/books/css-mastery' }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              前端开发资源
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              精选的前端开发资源，助您提升技能和效率
            </p>
          </div>
          
          <div className="space-y-16">
            {resources.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h2 className="text-xl leading-6 font-bold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors">
                        <a 
                          href={item.link} 
                          className="block h-full"
                          target={item.link.startsWith('http') ? '_blank' : '_self'}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                          <div className="mt-4 flex items-center text-primary-600">
                            <span className="text-sm font-medium">查看详情</span>
                            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 订阅区域 */}
          <div className="mt-16 bg-primary-600 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-10 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  <span className="block">想获取更多前端资源？</span>
                  <span className="block text-primary-200">订阅我的技术周刊</span>
                </h2>
                <p className="mt-3 max-w-3xl text-lg leading-6 text-primary-200">
                  每周精选前端开发资源、文章和工具，直接发送到您的邮箱
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">邮箱地址</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                    placeholder="输入您的邮箱"
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    >
                      订阅
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-primary-200">
                  我们尊重您的隐私，不会向任何人分享您的邮箱地址
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 