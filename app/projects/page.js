import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProjectsPage() {
  const projects = [
    {
      title: '小遇 AI',
      description: '一个智能AI助手平台，提供智能对话、内容生成和智能分析等功能。',
      image: 'https://placehold.co/600x400/3b82f6/ffffff?text=AI+Assistant',
      link: 'https://ai.xiaoyulove.xyz',
      tags: ['React', 'Next.js', 'AI', 'API集成']
    },
    {
      title: '前端开发工具集',
      description: '一系列提高前端开发效率的工具，包括CSS生成器、响应式设计测试和性能优化工具。',
      image: 'https://placehold.co/600x400/10b981/ffffff?text=Developer+Tools',
      link: '#',
      tags: ['JavaScript', 'CSS', '工具', 'webpack']
    },
    {
      title: 'UI组件库',
      description: '一个包含常用UI组件的库，采用现代设计风格，支持主题定制和响应式布局。',
      image: 'https://placehold.co/600x400/6366f1/ffffff?text=UI+Components',
      link: '#',
      tags: ['React', 'TypeScript', 'Tailwind', 'Storybook']
    },
    {
      title: '博客平台模板',
      description: '为技术博主设计的博客平台模板，支持文章管理、标签分类和评论功能。',
      image: 'https://placehold.co/600x400/f97316/ffffff?text=Blog+Platform',
      link: '#',
      tags: ['Next.js', 'MongoDB', '全栈', 'SEO优化']
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              我的项目作品
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              这些是我开发的项目，展示了我的技术能力和创新思维
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white transform transition duration-500 hover:scale-105">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={project.image} alt={project.title} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex space-x-2 mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{project.title}</p>
                      <p className="mt-3 text-base text-gray-500">{project.description}</p>
                    </a>
                  </div>
                  <div className="mt-6">
                    <a
                      href={project.link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      查看项目
                      <svg className="ml-2 -mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 