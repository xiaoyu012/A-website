'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const projects = [
  {
    name: '小遇AI',
    description: '智能对话助手，提供免费的自然语言交流，解答问题和创作内容。作为我们的明星项目，小遇AI已服务数万用户。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: "from-blue-400 to-indigo-500",
    link: "https://ai.xiaoyulove.xyz"
  },
  {
    name: '技术博客',
    description: '分享前沿技术资讯、开发经验和行业洞察，帮助开发者了解最新技术动态和提升专业技能。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-pink-400 to-purple-500",
    link: "/blog"
  },
  {
    name: '开源工具库',
    description: '丰富的开发工具和资源库，包括前端组件、API接口、数据处理工具等，助力开发者提高开发效率。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-yellow-400 to-orange-500",
    link: "/tools"
  },
  {
    name: '在线课程',
    description: '系统化的技术学习平台，涵盖编程语言、框架、算法等多个领域的课程，让学习更加高效和有趣。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "from-green-400 to-teal-500",
    link: "/courses"
  },
  {
    name: '社区论坛',
    description: '开发者交流平台，讨论技术问题、分享项目经验、获取反馈和寻找合作伙伴，构建活跃的技术社区。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: "from-purple-400 to-indigo-500",
    link: "/community"
  },
  {
    name: '解决方案',
    description: '针对不同行业和场景的定制化技术解决方案，包括企业智能化、数据分析、内容创作等多个领域。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-red-400 to-pink-500",
    link: "/solutions"
  }
]

// 3D卡片效果组件
function Card3D({ children, className = "" }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = ((centerY - y) / centerY) * 10

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      className={`transform-gpu transition-all duration-200 ${className}`}
      style={{
        transform: isHovering ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)` : "perspective(1000px) rotateX(0) rotateY(0)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  
  // 检测元素是否在视口内
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
  
  return (
    <div id="features" ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 装饰性背景 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full opacity-20 blur-3xl transform rotate-12"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-secondary-200 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className={`lg:text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">我们的项目</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            创新技术生态
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            我们开发了多款优质产品和服务，小遇AI只是其中之一
          </p>
        </div>

        <div className="mt-16">
          {/* 移动端卡片视图 */}
          <div className="md:hidden space-y-8">
            {projects.map((project, index) => (
              <Card3D 
                key={project.name}
                className={`feature-card mb-6 ${
                  index === activeFeature ? 'border-primary-500 shadow-lg' : ''
                } ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
                </div>
                <p className="mt-4 text-base text-gray-600">{project.description}</p>
                <div className="mt-4">
                  <Link href={project.link} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                    了解更多
                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </Card3D>
            ))}
          </div>

          {/* 桌面端网格视图 */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card3D 
                key={project.name} 
                className={`feature-card relative overflow-hidden group ${isInView ? 'animate-zoomIn' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* 闪光效果 */}
                <div className="absolute -inset-x-full top-0 bottom-0 h-full w-1/2 shimmer-bg transform -skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative z-10">
                  <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r ${project.color} text-white transform transition-transform group-hover:scale-110`}>
                    {project.icon}
                  </div>
                  <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900 group-hover:text-primary-500 transition-colors">{project.name}</h3>
                  <p className="mt-2 text-base text-gray-600">{project.description}</p>
                  <div className="mt-4">
                    <Link href={project.link} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group">
                      探索项目
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* 底部装饰 */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
              </Card3D>
            ))}
          </div>
        </div>
        
        {/* 技术平台展示区 */}
        <div className={`mt-16 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900">创新技术平台</h3>
              <p className="mt-6 text-gray-600">
                我们专注于创新技术的研发和应用，通过多年的技术积累和实践，搭建了一套完整的技术生态系统。
                从人工智能到云服务，从开发工具到技术教育，我们致力于为用户提供全方位的技术支持和服务。
              </p>
              <div className="mt-8">
                <a href="/" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  了解我们的技术
                  <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-8 lg:p-0 flex items-center justify-center">
              <div className="relative w-full max-w-md animate-float">
                {/* 技术架构图 */}
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-xs">技术架构</div>
                  </div>
                  <div className="p-4 text-green-400 font-mono text-sm">
                    <div className="animate-typewriter">
                      <span className="text-blue-400">技术栈 &gt;</span> 我们的核心技术
                    </div>
                    <div className="mt-2 animate-typewriter animation-delay-300 text-gray-300">
                      <pre><code>{`
├── 人工智能
│   ├── 自然语言处理
│   ├── 机器学习模型
│   └── 大规模语言模型
├── 前端技术
│   ├── React/Next.js
│   ├── Tailwind CSS
│   └── 动画与交互设计
├── 后端服务
│   ├── Node.js/Express
│   ├── Python/FastAPI
│   └── 微服务架构
├── 云基础设施
│   ├── 容器化部署
│   ├── CI/CD 流程
│   └── 高可用性架构
└── 开发工具
    ├── 代码生成工具
    ├── API管理平台
    └── 开发者文档
                      `}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 