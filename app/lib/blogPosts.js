import { siteMetadata } from './siteMetadata';

export const blogPosts = [
  {
    id: 8,
    slug: 'building-nodejs-cli-tools',
    title: '使用 Node.js 构建强大的命令行工具 - 从入门到精通',
    date: '2023-12-10',
    updatedDate: '2023-12-10',
    author: siteMetadata.author,
    category: 'Node.js',
    tags: ['Node.js', 'CLI', '工具开发', 'JavaScript'],
    readTime: '14分钟',
    excerpt: '本文详细介绍如何使用 Node.js 构建专业级命令行工具，涵盖参数解析、交互式提示、进度显示、颜色输出以及打包分发等关键技术。',
    imageUrl: '/blog/nodejs-cli.jpg'
  },
  {
    id: 7,
    slug: 'building-portfolio-nextjs-tailwind',
    title: '构建现代个人作品集网站 - Next.js 与 Tailwind CSS 实战指南',
    date: '2023-11-25',
    updatedDate: '2023-11-25',
    author: siteMetadata.author,
    category: 'Next.js',
    tags: ['Next.js', 'Tailwind CSS', '响应式设计', '作品集'],
    readTime: '15分钟',
    excerpt: '本文将指导你如何使用Next.js和Tailwind CSS构建一个专业、美观且功能完善的个人作品集网站，包括响应式设计、暗色模式和性能优化等。',
    imageUrl: '/blog/portfolio-nextjs.jpg'
  },
  {
    id: 1,
    slug: 'react-18-concurrent-mode',
    title: 'React 18新特性详解 - Concurrent Mode的实际应用',
    date: '2023-10-15',
    updatedDate: '2023-10-15',
    author: siteMetadata.author,
    category: 'React',
    tags: ['React', 'JavaScript', '前端开发'],
    readTime: '8分钟',
    excerpt: '本文深入探讨React 18中的并发特性，以及如何在实际项目中应用这些新功能来提升应用性能。',
    imageUrl: '/blog/react-18.jpg'
  },
  {
    id: 2,
    slug: 'css-grid-complete-guide',
    title: 'CSS Grid布局完全指南 - 从基础到实战',
    date: '2023-09-22',
    updatedDate: '2023-09-22',
    author: siteMetadata.author,
    category: 'CSS',
    tags: ['CSS', '布局', '响应式设计'],
    readTime: '10分钟',
    excerpt: '这篇文章详细介绍CSS Grid布局的所有核心概念，并通过实际案例展示如何构建复杂的响应式布局。',
    imageUrl: '/blog/css-grid.jpg'
  },
  {
    id: 3,
    slug: 'javascript-performance-optimization',
    title: 'JavaScript性能优化 - 实用技巧与最佳实践',
    date: '2023-08-30',
    updatedDate: '2023-08-30',
    author: siteMetadata.author,
    category: 'JavaScript',
    tags: ['JavaScript', '性能优化', '前端开发'],
    readTime: '12分钟',
    excerpt: '探索提升JavaScript应用性能的关键技术，包括代码分割、懒加载、内存管理和渲染优化等实用策略。',
    imageUrl: '/blog/js-performance.jpg'
  },
  {
    id: 4,
    slug: 'nextjs-13-app-router',
    title: 'Next.js 13应用路由详解 - 构建现代Web应用',
    date: '2023-08-05',
    updatedDate: '2023-08-05',
    author: siteMetadata.author,
    category: 'Next.js',
    tags: ['Next.js', 'React', '前端框架'],
    readTime: '9分钟',
    excerpt: '深入剖析Next.js 13的应用路由架构，以及如何利用这一强大特性构建高性能、SEO友好的现代Web应用。',
    imageUrl: '/blog/nextjs-13.jpg'
  },
  {
    id: 5,
    slug: 'typescript-advanced-types',
    title: 'TypeScript高级类型系统 - 提升代码质量的秘密武器',
    date: '2023-07-18',
    updatedDate: '2023-07-18',
    author: siteMetadata.author,
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', '类型系统'],
    readTime: '11分钟',
    excerpt: '本文探讨TypeScript的高级类型功能，包括条件类型、映射类型、类型守卫等，帮助你编写更安全、更可维护的代码。',
    imageUrl: '/blog/typescript.jpg'
  },
  {
    id: 6,
    slug: 'frontend-testing-strategy',
    title: '前端测试策略 - 从单元测试到端到端测试',
    date: '2023-06-29',
    updatedDate: '2023-06-29',
    author: siteMetadata.author,
    category: '测试',
    tags: ['测试', 'Jest', 'Cypress', '前端开发'],
    readTime: '13分钟',
    excerpt: '全面解析前端测试策略，涵盖单元测试、集成测试和端到端测试的实施方法，以及如何在团队中建立有效的测试文化。',
    imageUrl: '/blog/frontend-testing.jpg'
  }
];

function sortPosts(posts) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllBlogPosts() {
  return sortPosts(blogPosts);
}

export function getLatestBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostMeta(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getPrevNextPosts(slug) {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { prevPost: null, nextPost: null };
  }

  return {
    prevPost: index > 0 ? posts[index - 1] : null,
    nextPost: index < posts.length - 1 ? posts[index + 1] : null
  };
}
