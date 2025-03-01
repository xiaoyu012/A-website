import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as marked from 'marked';

// 获取博客文章数据
function getBlogPost(slug) {
  // 这里模拟从数据库获取文章
  // 实际应用中，这应该是从API或数据库获取
  
  // Node.js CLI 工具文章
  if (slug === 'building-nodejs-cli-tools') {
    return {
      title: '使用 Node.js 构建强大的命令行工具 - 从入门到精通',
      date: '2023-12-10',
      author: '小遇',
      category: 'Node.js',
      tags: ['Node.js', 'CLI', '工具开发', 'JavaScript'],
      readTime: '14分钟',
      excerpt: '本文详细介绍如何使用 Node.js 构建专业级命令行工具，涵盖参数解析、交互式提示、进度显示、颜色输出以及打包分发等关键技术。',
      imageUrl: '/blog/nodejs-cli.jpg',
      content: `
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

## 创建子命令

现在，让我们实现 \`init\` 命令作为示例。在 \`lib/commands/init.js\` 中：

\`\`\`javascript
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const { getProjectTemplates, validateProjectName } = require('../utils');

/**
 * 注册init命令
 * @param {import('commander').Command} program 
 */
function register(program) {
  program
    .command('init')
    .description('初始化一个新项目')
    .argument('[name]', '项目名称')
    .option('-t, --template <template>', '指定项目模板')
    .option('--no-install', '跳过依赖安装')
    .action(async (name, options) => {
      try {
        await initProject(name, options);
      } catch (err) {
        console.error(chalk.red('初始化项目失败:'), err);
        process.exit(1);
      }
    });
}

/**
 * 初始化项目的主要逻辑
 */
async function initProject(name, options) {
  console.log(chalk.bold('🚀 欢迎使用 Awesome CLI 创建新项目！'));
  
  // 1. 如果没有提供名称，询问项目名称
  const projectName = await promptProjectName(name);
  
  // 2. 获取可用模板并让用户选择
  const templateName = options.template || await promptTemplateSelection();
  
  // 3. 收集项目配置
  const projectConfig = await promptProjectConfig();
  
  // 4. 创建项目
  await createProject(projectName, templateName, projectConfig, options);
  
  console.log(chalk.green.bold('✅ 项目初始化成功！'));
  console.log();
  console.log('下一步：');
  console.log(chalk.cyan(\`  cd \${projectName}\`));
  console.log(chalk.cyan('  npm run dev'));
  console.log();
  console.log(chalk.blue('感谢使用 Awesome CLI，祝编码愉快！'));
}

/**
 * 询问项目名称
 */
async function promptProjectName(name) {
  if (name && validateProjectName(name)) {
    return name;
  }
  
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      default: 'my-awesome-project',
      validate: (input) => {
        if (!validateProjectName(input)) {
          return '项目名称只能包含小写字母、数字、连字符和下划线';
        }
        return true;
      }
    }
  ]);
  
  return projectName;
}

/**
 * 询问模板选择
 */
async function promptTemplateSelection() {
  const templates = getProjectTemplates();
  
  const { templateName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: '请选择项目模板:',
      choices: templates.map(t => ({
        name: \`\${t.name} - \${t.description}\`,
        value: t.name
      }))
    }
  ]);
  
  return templateName;
}

/**
 * 询问项目配置
 */
async function promptProjectConfig() {
  const { author, description, usesTypeScript, includesTests } = await inquirer.prompt([
    {
      type: 'input',
      name: 'author',
      message: '作者:'
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述:'
    },
    {
      type: 'confirm',
      name: 'usesTypeScript',
      message: '是否使用 TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includesTests',
      message: '是否包含测试框架?',
      default: true
    }
  ]);
  
  return {
    author,
    description,
    usesTypeScript,
    includesTests
  };
}

/**
 * 创建项目
 */
async function createProject(projectName, templateName, config, options) {
  const spinner = ora('创建项目...').start();
  
  try {
    // 1. 创建项目目录
    const projectPath = path.resolve(process.cwd(), projectName);
    fs.ensureDirSync(projectPath);
    
    // 2. 复制模板文件
    spinner.text = '复制项目模板...';
    // 这里只是示例，实际上需要实现模板复制逻辑
    await fs.writeFile(
      path.join(projectPath, 'package.json'), 
      JSON.stringify({
        name: projectName,
        version: '0.1.0',
        description: config.description,
        author: config.author,
        scripts: {
          start: 'node index.js',
          test: config.includesTests ? 'jest' : 'echo "No tests specified"'
        }
      }, null, 2)
    );
    
    // 3. 安装依赖
    if (options.install !== false) {
      spinner.text = '安装依赖...';
      process.chdir(projectPath);
      execSync('npm install', { stdio: 'ignore' });
    }
    
    spinner.succeed('项目创建完成！');
  } catch (err) {
    spinner.fail('项目创建失败');
    throw err;
  }
}

module.exports = {
  register
};
\`\`\`

以上是一个完整的 \`init\` 命令实现示例，它展示了如何：
1. 解析命令行参数
2. 提供交互式问答
3. 使用加载动画
4. 执行文件操作和外部命令
5. 提供彩色的终端输出

## 创建工具类

在 \`lib/utils/index.js\` 中，我们可以添加一些工具函数：

\`\`\`javascript
const fs = require('fs-extra');
const path = require('path');

/**
 * 获取可用的项目模板列表
 */
function getProjectTemplates() {
  // 在实际应用中，这些模板可能来自文件系统或远程仓库
  return [
    {
      name: 'react-app',
      description: 'React 应用模板'
    },
    {
      name: 'node-api',
      description: 'Node.js API 服务模板'
    },
    {
      name: 'static-site',
      description: '静态网站模板'
    }
  ];
}

/**
 * 验证项目名称是否合法
 */
function validateProjectName(name) {
  return /^[a-z0-9_-]+$/.test(name);
}

/**
 * 检查文件是否存在
 */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

module.exports = {
  getProjectTemplates,
  validateProjectName,
  fileExists
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

### 3. 添加进度条

\`\`\`javascript
const cliProgress = require('cli-progress');

function showProgressBar(task) {
  const bar = new cliProgress.SingleBar({
    format: '{bar} {percentage}% | ETA: {eta}s | {value}/{total} | {task}',
    barCompleteChar: '\\u2588',
    barIncompleteChar: '\\u2591',
  });
  
  bar.start(100, 0, { task });
  
  // 模拟进度更新
  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    
    bar.update(Math.floor(progress), { task });
    
    if (progress >= 100) {
      clearInterval(timer);
      bar.stop();
    }
  }, 300);
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
      `
    };
  }
  
  // TypeScript高级类型系统文章
  if (slug === 'typescript-advanced-types') {
    return {
      title: 'TypeScript高级类型系统 - 提升代码质量的秘密武器',
      date: '2023-07-18',
      author: '小遇',
      category: 'TypeScript',
      tags: ['TypeScript', 'JavaScript', '类型系统'],
      readTime: '11分钟',
      excerpt: '本文探讨TypeScript的高级类型功能，包括条件类型、映射类型、类型守卫等，帮助你编写更安全、更可维护的代码。',
      imageUrl: '/blog/typescript.jpg',
      content: `
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
// 使用 typeof 类型守卫
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        // 此处 padding 的类型被缩小为 number
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        // 此处 padding 的类型被缩小为 string
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}

// 使用 instanceof 类型守卫
class Bird {
    fly() {
        console.log("鸟儿飞行");
    }
    layEggs() {
        console.log("鸟儿下蛋");
    }
}

class Fish {
    swim() {
        console.log("鱼儿游泳");
    }
    layEggs() {
        console.log("鱼儿产卵");
    }
}

function getRandomPet(): Fish | Bird {
    return Math.random() < 0.5 ? new Fish() : new Bird();
}

const pet = getRandomPet();

if (pet instanceof Bird) {
    // 此处 pet 的类型被缩小为 Bird
    pet.fly();
}
if (pet instanceof Fish) {
    // 此处 pet 的类型被缩小为 Fish
    pet.swim();
}
\`\`\`

## 自定义类型守卫

除了使用 typeof 和 instanceof，我们还可以创建自定义的类型守卫函数：

\`\`\`typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

// 自定义类型守卫
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// 使用自定义类型守卫
function move(pet: Fish | Bird) {
    if (isFish(pet)) {
        // TypeScript 知道这里 pet 是 Fish 类型
        pet.swim();
    } else {
        // TypeScript 知道这里 pet 是 Bird 类型
        pet.fly();
    }
}
\`\`\`

## 索引类型 (Index Types)

索引类型允许我们动态查询和访问对象的属性：

\`\`\`typescript
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

const taxi: Car = {
    manufacturer: "丰田",
    model: "卡罗拉",
    year: 2020
};

// 结果类型是 (string | number)[]
const nameAndYear = pluck(taxi, ['manufacturer', 'year']);
\`\`\`

## 实用工具类型

TypeScript 提供了许多内置的工具类型，它们利用以上高级类型功能实现：

\`\`\`typescript
// Partial<T> - 将T中的所有属性变为可选
interface User {
    id: number;
    name: string;
    email: string;
}

// 所有字段都变为可选
function updateUser(user: User, fieldsToUpdate: Partial<User>) {
    return { ...user, ...fieldsToUpdate };
}

// Pick<T, K> - 从T中选择特定属性K
type UserBasicInfo = Pick<User, 'id' | 'name'>;

// Omit<T, K> - 从T中排除特定属性K
type UserWithoutEmail = Omit<User, 'email'>;

// ReturnType<T> - 获取函数返回值的类型
function createUser() {
    return { id: 1, name: "小遇", email: "xiaoyu@example.com" };
}

type CreatedUser = ReturnType<typeof createUser>;  // User 类型
\`\`\`

## 总结

TypeScript 的高级类型系统是提升代码质量的强大工具，通过掌握条件类型、映射类型、类型守卫和索引类型，我们可以：

1. 创建更精确的类型定义
2. 提高代码的可读性和可维护性
3. 在编译时捕获潜在错误
4. 增强IDE的代码补全和提示功能

在实际项目中灵活运用这些类型特性，将帮助我们构建更加健壮和可靠的应用程序。

我是一名大二学生，欢迎和我交流这些前端技术心得，一起学习进步！
      `,
      // 相关中国网站资源
      relatedResources: [
        { 
          name: '阮一峰ES6入门教程', 
          description: '包含TypeScript相关知识的权威中文资源', 
          url: 'https://es6.ruanyifeng.com/' 
        },
        { 
          name: 'TS官方中文文档', 
          description: 'TypeScript官方中文文档', 
          url: 'https://www.tslang.cn/docs/home.html' 
        },
        { 
          name: 'TypeScript中文网', 
          description: '中文TypeScript教程和社区', 
          url: 'https://www.typescriptlang.org/zh/' 
        },
        { 
          name: '掘金TypeScript专栏', 
          description: '中文TypeScript相关文章集合', 
          url: 'https://juejin.cn/tag/TypeScript' 
        },
        { 
          name: '印记中文 - TypeScript', 
          description: '高质量TypeScript教程翻译', 
          url: 'https://docschina.org/' 
        }
      ],
      // 延展阅读资源
      furtherReadings: [
        {
          title: 'TypeScript泛型全面解析',
          excerpt: '深入理解TypeScript泛型的使用方法和实战技巧',
          slug: 'typescript-generics'
        },
        {
          title: '从JavaScript到TypeScript - 平滑过渡指南',
          excerpt: '如何逐步将JavaScript项目迁移到TypeScript',
          slug: 'javascript-to-typescript'
        },
        {
          title: 'TypeScript编译原理解析',
          excerpt: '探索TypeScript编译器的工作原理和优化策略',
          slug: 'typescript-compiler'
        }
      ]
    };
  }
  
  // 个人作品集网站开发文章
  if (slug === 'building-portfolio-nextjs-tailwind') {
    return {
      title: '构建现代个人作品集网站 - Next.js 与 Tailwind CSS 实战指南',
      date: '2023-11-25',
      author: '小遇',
      category: 'Next.js',
      tags: ['Next.js', 'Tailwind CSS', '响应式设计', '作品集'],
      readTime: '15分钟',
      excerpt: '本文将指导你如何使用Next.js和Tailwind CSS构建一个专业、美观且功能完善的个人作品集网站，包括响应式设计、暗色模式和性能优化等。',
      imageUrl: '/blog/portfolio-nextjs.jpg',
      content: `
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
// app/components/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // 防止水合作用不匹配
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const navItems = [
    { name: '首页', path: '/' },
    { name: '关于', path: '/about' },
    { name: '项目', path: '/projects' },
    { name: '联系', path: '/contact' },
  ];
  
  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
            <span className="text-primary-600">Portfolio</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={
                  \`transition-colors hover:text-primary-600 \${
                    pathname === item.path 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-600 dark:text-gray-300'
                  }\`
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </button>
            )}
            
            <button
              onClick={toggleMenu}
              className="ml-2 md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={
                  \`block px-3 py-2 rounded-md \${
                    pathname === item.path
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }\`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
\`\`\`

### 项目展示卡片

项目展示是作品集网站的核心部分，需要设计一个既美观又能突出项目特点的卡片组件：

\`\`\`jsx
// app/components/ProjectCard.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {project.github && (
              <Link 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors"
              >
                <FiGithub className="h-5 w-5" />
              </Link>
            )}
            {project.demo && (
              <Link 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors"
              >
                <FiExternalLink className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <Link 
          href={\`/projects/\${project.slug}\`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          查看详情
          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
\`\`\`

## 构建关键页面部分

### 英雄区域 (Hero Section)

作品集网站的第一印象非常重要，需要设计一个既能吸引眼球又能传达个人品牌的英雄区域：

\`\`\`jsx
// app/sections/Hero.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100 via-gray-100 to-gray-100 dark:from-primary-900/40 dark:via-gray-900 dark:to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              前端开发者
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              你好，我是<span className="text-primary-600">小遇</span><br />
              打造美观的网站体验
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              我是一名热爱创造的前端开发者，专注于构建美观、响应式且性能优异的网站和应用。
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/projects"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                查看我的作品
              </Link>
              <Link 
                href="/contact"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                联系我
              </Link>
            </div>
            
            <div className="mt-8 flex items-center space-x-6">
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" />
              </Link>
              <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" />
              </Link>
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* 放置一个代表性的图片或3D模型 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <span className="text-sm">在这里放置你的个人形象或代表作品的3D模型</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
\`\`\`

## 性能优化与SEO

### 图片优化

良好的图片优化对于作品集网站至关重要，可以提高加载速度和用户体验：

1. 使用Next.js的Image组件自动进行懒加载和图像优化
2. 使用适当的图像格式（WebP或AVIF）以获得更好的压缩率
3. 为不同尺寸的设备提供多种分辨率的图像

### SEO最佳实践

确保你的作品集网站能被搜索引擎有效索引：

\`\`\`jsx
// app/layout.js
export const metadata = {
  title: {
    default: '小遇 | 前端开发者作品集',
    template: '%s | 小遇的作品集'
  },
  description: '小遇的个人作品集网站，展示前端开发项目和技能。专注于React, Next.js和现代Web开发。',
  keywords: ['前端开发', 'React', 'Next.js', 'Tailwind CSS', '作品集', '网站开发'],
  authors: [{ name: '小遇' }],
  creator: '小遇',
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
      relatedResources: [
        { name: 'Next.js官方文档', description: '学习Next.js的完整指南', url: 'https://nextjs.org/docs' },
        { name: 'Tailwind CSS官方文档', description: '掌握Tailwind CSS的所有功能', url: 'https://tailwindcss.com/docs' },
        { name: 'Vercel部署平台', description: '最适合Next.js应用的部署平台', url: 'https://vercel.com/' },
        { name: '掘金 - 前端专区', description: '中文前端技术社区', url: 'https://juejin.cn/frontend' }
      ],
      furtherReadings: [
        {
          slug: 'nextjs-13-app-router',
          title: 'Next.js 13应用路由详解 - 构建现代Web应用',
          excerpt: '深入剖析Next.js 13的应用路由架构，以及如何利用这一强大特性构建高性能、SEO友好的现代Web应用。'
        },
        {
          slug: 'css-grid-complete-guide',
          title: 'CSS Grid布局完全指南 - 从基础到实战',
          excerpt: '这篇文章详细介绍CSS Grid布局的所有核心概念，并通过实际案例展示如何构建复杂的响应式布局。'
        },
        {
          slug: 'javascript-performance-optimization',
          title: 'JavaScript性能优化 - 实用技巧与最佳实践',
          excerpt: '探索提升JavaScript应用性能的关键技术，包括代码分割、懒加载、内存管理和渲染优化等实用策略。'
        }
      ]
    };
  }
  
  // 其他文章...
  return null;
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">404</h1>
          <p className="text-xl text-gray-600 mb-8">文章不存在或已被移除</p>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700">
            返回博客首页
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Header />
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
              <div className="flex space-x-4 sm:space-x-6">
                <button className="text-gray-500 hover:text-primary-600 transition-colors flex items-center text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  分享
                </button>
                <button className="text-gray-500 hover:text-primary-600 transition-colors flex items-center text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  收藏
                </button>
              </div>
            </div>
            
            {/* 作者信息 */}
            <div className="mt-8 flex items-center p-6 bg-gray-50 rounded-lg">
              <img 
                src="/assets/avatar.jpg" 
                alt={post.author} 
                className="w-16 h-16 rounded-full mr-6 object-cover border-2 border-white shadow"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                <p className="text-gray-600 mt-1">前端开发工程师，热爱分享与学习。专注于React、Next.js等前端技术栈。</p>
                <div className="mt-3 flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.032 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      {/* 相关文章推荐 */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">你可能也感兴趣</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  React
                </div>
              </div>
              <div className="p-5">
                <Link href="/blog/react-18-concurrent-mode" className="block">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    React 18新特性详解 - Concurrent Mode的实际应用
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">2023-10-15</span>
                  <Link href="/blog/react-18-concurrent-mode" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  JavaScript
                </div>
              </div>
              <div className="p-5">
                <Link href="/blog/javascript-performance-optimization" className="block">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    JavaScript性能优化 - 实用技巧与最佳实践
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">2023-08-30</span>
                  <Link href="/blog/javascript-performance-optimization" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-40 bg-gradient-to-r from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 text-primary-600 font-medium py-1 px-2 rounded-md text-xs">
                  Node.js
                </div>
              </div>
              <div className="p-5">
                <Link href="/blog/building-nodejs-cli-tools" className="block">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                    使用 Node.js 构建强大的命令行工具 - 从入门到精通
                  </h3>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">2023-12-10</span>
                  <Link href="/blog/building-nodejs-cli-tools" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    阅读全文
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              查看所有文章
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}