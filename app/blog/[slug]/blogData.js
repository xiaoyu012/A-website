// 博客文章数据 (按日期降序排列)
export const blogPosts = [
  {
    slug: 'building-nodejs-cli-tools',
    title: '使用 Node.js 构建强大的命令行工具 - 从入门到精通',
    date: '2023-12-10',
    updatedDate: '2023-12-10',
    author: '小遇',
    category: 'Node.js',
    tags: ['Node.js', 'CLI', '工具开发', 'JavaScript'],
    readTime: '14分钟',
    excerpt: '本文详细介绍如何使用 Node.js 构建专业级命令行工具，涵盖参数解析、交互式提示、进度显示、颜色输出以及打包分发等关键技术。',
    imageUrl: '/blog/nodejs-cli.jpg',
  },
  {
    slug: 'building-portfolio-nextjs-tailwind',
    title: '使用 Next.js 和 Tailwind CSS 构建现代化作品集网站',
    date: '2023-09-05',
    updatedDate: '2023-09-05',
    author: '小遇',
    category: 'Web开发',
    tags: ['Next.js', 'Tailwind CSS', '作品集', 'React'],
    readTime: '12分钟',
    excerpt: '本文将带你从零开始，使用 Next.js 和 Tailwind CSS 构建一个既美观又高性能的个人作品集网站，全面展示你的技术能力和项目经验。',
    imageUrl: '/blog/portfolio-nextjs.jpg',
  },
  {
    slug: 'typescript-advanced-types',
    title: 'TypeScript高级类型系统 - 提升代码质量的秘密武器',
    date: '2023-07-18',
    updatedDate: '2023-07-18',
    author: '小遇',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', '类型系统'],
    readTime: '11分钟',
    excerpt: '本文探讨TypeScript的高级类型功能，包括条件类型、映射类型、类型守卫等，帮助你编写更安全、更可维护的代码。',
    imageUrl: '/blog/typescript.jpg',
  },
];

// 获取上一篇和下一篇文章
export function getPrevNextPosts(slug) {
  const currentIndex = blogPosts.findIndex(post => post.slug === slug);
  
  return {
    prevPost: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
    nextPost: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null,
  };
}

// 根据slug获取博客文章基本信息
export function getBlogPostMeta(slug) {
  return blogPosts.find(post => post.slug === slug);
}
