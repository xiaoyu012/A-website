// 博客文章内容
export const blogContents = {
  'building-nodejs-cli-tools': `
## 为什么选择 Node.js 构建命令行工具？

在开发者的日常工作中，命令行工具是提升效率的关键助手。无论是项目脚手架、自动化部署脚本，还是开发辅助工具，一个好用的 CLI 工具都能大幅提高工作效率。Node.js 凭借其跨平台特性、丰富的包生态和低门槛的 JavaScript 语法，成为构建 CLI 工具的理想选择。

本文将带你从零开始，一步步构建一个功能完善、用户友好的命令行工具，并分享许多实用技巧和最佳实践。

## 搭建基础项目结构

首先，让我们创建一个新的 Node.js 项目：

\`\`\`bash
mkdir awesome-cli
cd awesome-cli
npm init -y
\`\`\`

接下来，添加必要的依赖：

\`\`\`bash
npm install commander inquirer chalk ora glob fs-extra
\`\`\`

这些库各自的作用是：
- **commander**: 命令行参数解析
- **inquirer**: 交互式命令行用户界面
- **chalk**: 终端字符串样式（颜色、粗体等）
- **ora**: 终端加载动画
- **glob**: 文件匹配模式
- **fs-extra**: 文件系统操作的增强版

现在，让我们创建项目的核心文件结构：

\`\`\`
awesome-cli/
├── bin/
│   └── cli.js        # CLI 入口点
├── lib/
│   ├── commands/     # 各个子命令的实现
│   ├── utils/        # 工具函数
│   └── index.js      # 核心逻辑
├── package.json
└── README.md
\`\`\`

## 创建 CLI 入口

首先，我们需要在 \`bin/cli.js\` 中设置 CLI 的入口点：

\`\`\`javascript
#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const cli = require('../lib');

// 设置基本信息
program
  .name('awesome-cli')
  .description('一个功能强大的命令行工具示例')
  .version(pkg.version);

// 注册命令
cli.registerCommands(program);

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供命令，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
\`\`\`

注意文件顶部的 \`#!/usr/bin/env node\` 声明，这告诉系统使用 Node.js 来执行此文件。

## 实现核心逻辑

接下来，在 \`lib/index.js\` 中实现核心逻辑：

\`\`\`javascript
const initCommand = require('./commands/init');
const generateCommand = require('./commands/generate');
const buildCommand = require('./commands/build');

/**
 * 注册所有命令到程序实例
 * @param {import('commander').Command} program 
 */
function registerCommands(program) {
  // 初始化项目命令
  initCommand.register(program);
  
  // 生成组件/模块命令
  generateCommand.register(program);
  
  // 构建项目命令
  buildCommand.register(program);
}

module.exports = {
  registerCommands
};
\`\`\`

## 配置 package.json

为了让我们的 CLI 工具可执行，需要在 \`package.json\` 中添加 \`bin\` 字段：

\`\`\`json
{
  "name": "awesome-cli",
  "version": "1.0.0",
  "description": "一个功能强大的命令行工具示例",
  "main": "lib/index.js",
  "bin": {
    "awesome-cli": "./bin/cli.js"
  },
  "scripts": {
    "start": "node ./bin/cli.js",
    "test": "jest"
  },
  "keywords": ["cli", "node", "tool"],
  "author": "你的名字",
  "license": "MIT",
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^9.4.0",
    "fs-extra": "^10.1.0",
    "glob": "^8.0.3",
    "inquirer": "^8.2.4",
    "ora": "^5.4.1"
  }
}
\`\`\`

## 全局安装与发布

如果要在本地测试全局安装，可以使用：

\`\`\`bash
npm link
\`\`\`

这样就可以在系统中全局访问你的 CLI 工具了：

\`\`\`bash
awesome-cli init my-project
\`\`\`

当准备发布到 npm 时，确保已经登录：

\`\`\`bash
npm login
npm publish
\`\`\`

## 增强用户体验的高级技巧

除了基本功能外，这里有一些提升 CLI 工具用户体验的高级技巧：

### 1. 实现自动更新检查

\`\`\`javascript
const checkForUpdate = async (pkg) => {
  const spinner = ora('检查更新...').start();
  try {
    const { name, version } = pkg;
    const latestVersion = execSync(\`npm view \${name} version\`).toString().trim();
    
    if (latestVersion && latestVersion !== version) {
      spinner.succeed('发现新版本！');
      console.log(
        chalk.yellow(\`当前版本: \${version}, 最新版本: \${latestVersion}\`)
      );
      console.log(chalk.blue(\`运行 'npm install -g \${name}' 来更新\`));
    } else {
      spinner.succeed('已经是最新版本');
    }
  } catch (err) {
    spinner.fail('检查更新失败');
  }
};
\`\`\`

### 2. 添加交互式帮助菜单

\`\`\`javascript
async function showInteractiveHelp() {
  const { command } = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: '请选择您需要了解的命令:',
      choices: [
        { name: '初始化新项目 (init)', value: 'init' },
        { name: '生成组件 (generate)', value: 'generate' },
        { name: '构建项目 (build)', value: 'build' },
        { name: '返回主菜单', value: 'back' }
      ]
    }
  ]);
  
  if (command === 'back') return;
  
  // 显示特定命令的详细帮助
  showCommandHelp(command);
}
\`\`\`

## 总结与最佳实践

通过本文，我们学习了如何使用 Node.js 构建一个功能完善的命令行工具。以下是一些最佳实践：

1. **模块化设计**：将功能分解为小型、可重用的模块
2. **友好的错误处理**：提供清晰的错误消息和恢复建议
3. **渐进式体验**：支持命令行参数和交互式问答
4. **视觉反馈**：使用颜色、图标和动画增强用户体验
5. **完善的文档**：提供详细的帮助信息和示例
6. **测试覆盖**：确保关键功能的可靠性

通过遵循这些原则，你可以构建出专业级的命令行工具，提升你和你团队的开发效率。

希望本文对你有所帮助，祝你成功构建出强大的 CLI 工具！
  `,
  
  'typescript-advanced-types': `
## TypeScript 高级类型系统简介

TypeScript 作为 JavaScript 的超集，提供了丰富的类型系统，极大地增强了代码的可靠性和可维护性。本文将深入探讨 TypeScript 的高级类型特性，帮助你充分利用这些"秘密武器"来提升代码质量。

## 条件类型 (Conditional Types)

条件类型允许我们根据类型关系创建动态类型，就像是类型系统中的 if 语句：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

// 使用示例
type Result1 = IsString<string>;  // true
type Result2 = IsString<number>;  // false
\`\`\`

条件类型的强大之处在于它可以与泛型结合使用，实现类型转换和过滤：

\`\`\`typescript
// 从类型T中排除可分配给类型U的类型
type Exclude<T, U> = T extends U ? never : T;

// 使用示例
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;  // 'b' | 'c'
type T1 = Exclude<string | number | (() => void), Function>;  // string | number
\`\`\`

## 映射类型 (Mapped Types)

映射类型允许我们基于旧类型创建新类型，通过遍历现有类型的属性来转换它们：

\`\`\`typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 使用示例
interface Person {
    name: string;
    age: number;
}

const readonlyPerson: Readonly<Person> = {
    name: "张三",
    age: 30
};

// 以下操作将导致类型错误
// readonlyPerson.name = "李四";
\`\`\`

TypeScript 内置了几个常用的映射类型：\`Partial<T>\`, \`Required<T>\`, \`Readonly<T>\`, \`Record<K,T>\` 等。

## 类型守卫 (Type Guards)

类型守卫让我们可以在运行时检查类型，并在特定的代码块中缩小类型范围：

\`\`\`typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function processValue(value: string | number) {
    if (isString(value)) {
        // 在这个块中，TypeScript 知道 value 是 string
        console.log(value.toUpperCase());
    } else {
        // 这里 value 是 number
        console.log(value.toFixed(2));
    }
}
\`\`\`

## 实用工具类型

TypeScript 提供了许多内置的实用工具类型，可以帮助我们更轻松地进行类型转换：

### Partial<T>

将类型 T 的所有属性变为可选：

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type PartialUser = Partial<User>;
// 等价于: { id?: number; name?: string; email?: string; }
\`\`\`

### Pick<T, K>

从类型 T 中选择属性 K 的子集：

\`\`\`typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// 等价于: { id: number; name: string; }
\`\`\`

### Omit<T, K>

从类型 T 中排除属性 K：

\`\`\`typescript
type UserWithoutEmail = Omit<User, 'email'>;
// 等价于: { id: number; name: string; }
\`\`\`

## 总结

TypeScript 的高级类型系统为我们提供了强大的工具来构建类型安全的应用程序。通过掌握这些高级特性，你可以：

1. 编写更加类型安全的代码
2. 提高代码的可维护性
3. 减少运行时错误
4. 提升开发体验

持续学习和实践这些高级类型特性，将帮助你成为更优秀的 TypeScript 开发者！
  `,
  
  'building-portfolio-nextjs-tailwind': `
## 为什么选择Next.js和Tailwind CSS构建作品集网站？

作为一名开发者，拥有一个专业的作品集网站对于展示你的技能和项目经验至关重要。在众多技术选择中，Next.js和Tailwind CSS的组合提供了卓越的开发体验和最终产品质量。

Next.js作为React框架，提供了服务器端渲染、静态生成、API路由等强大功能，而Tailwind CSS则通过其实用优先的设计理念，使得快速构建美观且响应式的界面变得更加简单。

## 项目准备工作

### 技术栈概览

- **Next.js 14+**: 提供React框架，支持SSR和SSG
- **Tailwind CSS 3**: 实用优先的CSS框架
- **Framer Motion**: 用于页面过渡和动画效果
- **React Icons**: 提供丰富的图标集合
- **next-themes**: 实现暗色模式

### 环境设置

首先，让我们创建一个新的Next.js项目并安装必要的依赖：

\`\`\`bash
npx create-next-app portfolio-website
cd portfolio-website
npm install framer-motion react-icons next-themes
\`\`\`

确保在项目创建过程中选择Tailwind CSS作为样式解决方案。

## 项目结构设计

一个良好的项目结构可以提高开发效率和代码可维护性：

\`\`\`
/app
  /components
    /ui
      Button.jsx
      Card.jsx
      ...
    Header.jsx
    Footer.jsx
    ProjectCard.jsx
    ...
  /sections
    Hero.jsx
    About.jsx
    Projects.jsx
    Contact.jsx
  /lib
    projects.js
    skills.js
  /theme
    ThemeProvider.jsx
  layout.js
  page.js
  about/page.js
  projects/page.js
  contact/page.js
/public
  /images
  /projects
\`\`\`

## 构建核心组件

### 响应式导航栏

导航栏是作品集网站的重要组成部分，需要在不同设备上都能提供良好的用户体验：

\`\`\`jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            YourName
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary-600">首页</Link>
            <Link href="/about" className="hover:text-primary-600">关于</Link>
            <Link href="/projects" className="hover:text-primary-600">项目</Link>
            <Link href="/contact" className="hover:text-primary-600">联系</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
\`\`\`

## SEO 优化

Next.js 14+ 提供了新的元数据 API，使 SEO 优化变得更加简单：

\`\`\`jsx
// app/layout.js
export const metadata = {
  title: {
    default: '小遇 | 前端开发者',
    template: '%s | 小遇的作品集'
  },
  description: '小遇的个人作品集网站，展示前端开发项目和技能。',
  keywords: ['前端开发', 'React', 'Next.js', '作品集'],
  authors: [{ name: '小遇' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourportfolio.com',
    siteName: '小遇的作品集',
    title: '小遇 | 前端开发者作品集',
    description: '小遇的个人作品集网站，展示前端开发项目和技能。',
    images: [
      {
        url: 'https://yourportfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '小遇的作品集',
      },
    ],
  },
};
\`\`\`

## 部署你的作品集网站

Next.js应用有多种部署选项，其中最简单和推荐的是使用Vercel：

1. 将你的代码推送到GitHub仓库
2. 在Vercel上导入该仓库
3. Vercel会自动配置构建设置
4. 点击"Deploy"按钮

Vercel还提供了免费的SSL证书、全球CDN和自动预览部署等功能。

## 结语

构建一个现代化的个人作品集网站不仅能展示你的技术能力，还能为你的职业发展增添亮点。通过Next.js和Tailwind CSS的强大组合，你可以创建一个既美观又高性能的作品集网站，向潜在雇主或客户展示你的专业能力。

记住，一个好的作品集网站不仅仅是技术的展示，更是你个人品牌的延伸。保持内容的更新，不断添加新项目，并根据反馈持续改进，你的作品集网站将成为你职业道路上的有力助手。
  `,

  'react-18-concurrent-mode': `
## 为什么要关注 Concurrent Rendering？

React 18 引入的并发渲染能力可以让界面在繁忙的渲染任务中依旧保持灵敏的交互体验。通过让 React 在后台构建 UI，再在合适的时机一次性提交视觉更新，我们能够避免界面卡顿和输入阻塞的问题。

### startTransition 让交互更顺滑

\`\`\`jsx
import { startTransition } from 'react';

function SearchBox({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);

    startTransition(() => {
      onChange(nextValue);
    });
  };

  return <input value={value} onChange={handleChange} />;
}
\`\`\`

当输入框的值发生变化时，我们将昂贵的列表过滤操作包裹在 \`startTransition\` 中，这样 React 就能在后台优先处理用户输入，随后再渲染新的列表。

### useDeferredValue 与 Suspense 的组合

\`useDeferredValue\` 可以帮助我们构建更自然的加载状态：

1. 立即更新本地输入或控件状态；
2. 为代价更高的 UI 创建一个延迟值；
3. 在延迟值变化时配合 \`Suspense\` 或骨架屏展示加载指示。

### Streaming SSR 加速首屏

React 18 的 \`renderToPipeableStream\` 让我们能够将首屏内容尽早推送给浏览器，再逐步注入剩余的 HTML。结合 Next.js 13+ 的 App Router，可以非常轻松地获得渐进式渲染体验。

> 提示：在使用 Concurrent Rendering 时，要避免在渲染流程中引入阻塞主线程的同步任务，例如大型计算或阻塞式 I/O。
  `,

  'css-grid-complete-guide': `
## 用 CSS Grid 构建自适应布局

CSS Grid 提供了原生的二维布局能力，让我们能够精准地控制行与列。一个经典的 12 列布局可以这样定义：

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem;
}
\`\`\`

### 自适应的轨道尺寸

\`minmax\` 与 \`auto-fit / auto-fill\` 的组合能够让网格在不同屏幕宽度下自由伸缩：

\`\`\`css
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
\`\`\`

### 常见布局模式

- **卡片式画廊**：使用 \`auto-fill\` 自动补齐空列，保持卡片宽度一致；
- **媒体对象**：通过 \`grid-template-areas\` 定义命名区域，在移动端重新排列；
- **Sticky 布局**：结合 \`position: sticky\` 创建固定的侧边目录。

实践中可以将 Grid 与 Flexbox 混合使用：Grid 负责整体结构，Flexbox 处理局部对齐，从而获得更灵活的响应式布局。
  `,

  'javascript-performance-optimization': `
## 构建高性能的 JavaScript 应用

性能优化通常可以拆分为三个阶段：网络、执行和渲染。针对不同阶段采取有针对性的策略能够显著提升感知速度。

### 减少首屏负担

- 启用 bundler 的代码分割与动态 import；
- 配置资源预获取 (prefetch) 与预连接 (preconnect)；
- 为第三方脚本设置 \`async\`/\`defer\` 并监控其影响。

### 避免不必要的计算

合理地 memo 化可以让组件避免重复渲染：

\`\`\`jsx
const total = useMemo(() => heavyCalculation(items), [items]);
\`\`\`

同时，利用 \`requestAnimationFrame\` 批量处理需要同步 DOM 的动画，避免在滚动和输入事件中直接写入样式。

### 监控与回归

借助 Performance Timeline、Lighthouse 以及 Web Vitals，可以持续跟踪 FCP、LCP、INP 等指标。一旦监控出现回归，首先定位是脚本执行时间、样式计算还是布局抖动导致，再对症下药。
  `,

  'nextjs-13-app-router': `
## 探索 Next.js 13 App Router

App Router 带来了以目录结构为中心的开发体验：\`layout.js\`、\`page.js\`、\`loading.js\`、\`error.js\` 等文件让我们可以独立定义页面骨架与错误边界。

### Server Components 默认加持

服务器组件可以直接读取数据库或调用 API，无需发送额外的客户端 bundle。对于需要交互的部分再使用 \`"use client"\` 生成岛屿组件，实现更细粒度的代码拆分。

### 数据获取策略

Next.js 14 提供了统一的 \`fetch\` 缓存语义：

- \`fetch(url, { cache: 'no-store' })\`：实时数据；
- \`fetch(url, { next: { revalidate: 60 } })\`：增量静态再生成；
- \`export const dynamic = 'force-static'\`：强制编译期产物。

结合 \`generateMetadata\` 与 \`generateStaticParams\`，可以在构建期生成 SEO 友好的页面，同时保留对动态数据的精细控制。
  `,

  'frontend-testing-strategy': `
## 设计可靠的前端测试体系

一个健康的测试金字塔通常包含：

1. **单元测试**：验证纯函数或组件逻辑；
2. **集成测试**：确保组件之间的协作，如表单、状态管理；
3. **端到端测试**：模拟真实用户流程，例如注册或结账。

### 打造可维护的单元测试

- 使用 Jest + React Testing Library，关注用户可见的结果而非实现细节；
- 利用 \`msw\` 模拟网络请求，避免与真实 API 紧耦合；
- 为关键工具函数编写基于数据驱动的测试用例。

### 端到端测试小贴士

- 使用 Playwright/Cypress 在 CI 中并行执行；
- 通过 \`data-testid\` 或 \`aria-label\` 提供稳定的选择器；
- 在流水线上收集截图和视频，帮助快速定位失败原因。

最后，将测试运行集成到 Git Hooks 或 CI 流程中，确保每一次改动都被自动验证，避免回归。
  `,
};

export function getBlogContent(slug) {
  return blogContents[slug] || '';
}
