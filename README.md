# 小遇个人网站 & 技术博客

这是一个使用Next.js和Tailwind CSS构建的个人网站和技术博客。

## 在线访问

- **网站链接**: [https://xiaoyulove.xyz/](https://xiaoyulove.xyz/)
- **GitHub仓库**: [https://github.com/xiaoyu012/A-website](https://github.com/xiaoyu012/A-website)


## 特点

- **响应式设计**：适配各种设备尺寸的现代UI
- **个人简介**：展示前端开发经验和技能
- **技术博客**：分享前端开发知识和经验
- **项目展示**：展示个人开发的项目成果
- **联系方式**：提供多种联系渠道

## 技术栈

- **框架**: [Next.js](https://nextjs.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **动画**: 自定义CSS和Intersection Observer API
- **部署**: Vercel

## 本地开发

确保你已安装Node.js 14.0.0或更高版本。

```bash
# 克隆仓库
git clone https://github.com/xiaoyu012/A-website.git
cd A-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开[http://localhost:6007](http://localhost:6007)查看网站。

## 项目结构

```
/app                    # Next.js 13+ App目录
  /components           # React组件
    /Header.js          # 导航菜单组件
    /Hero.js            # 主页英雄区组件
    /About.js           # 关于我组件
    /Blog.js            # 博客列表组件
    /CTA.js             # 行动号召组件
    /Footer.js          # 页脚组件
  /page.js              # 主页面组件
  /layout.js            # 应用布局组件
  /globals.css          # 全局样式

/public                 # 静态资源
```

## RSS & Atom 订阅

- **RSS**: [`https://xiaoyulove.xyz/rss.xml`](https://xiaoyulove.xyz/rss.xml)
- **Atom**: [`https://xiaoyulove.xyz/atom.xml`](https://xiaoyulove.xyz/atom.xml)
- **自定义数量**: 两个源都支持 `?limit=N` 参数，可限制返回最新 N 篇文章（默认最多 50 篇，例如 `https://xiaoyulove.xyz/rss.xml?limit=10`）。
- **字段**: 每条内容包含标题、简介、发布日期、作者、分类及标签信息，满足主流阅读器的富文本展示需求。
- **兼容性**: 输出符合 RSS 2.0 / Atom 1.0 规范，可直接导入 Feedly、Inoreader、Reeder 等阅读器。
- **性能**: 源文件支持 CDN 缓存并限制条目数量，确保生成和分发速度。

## 未来计划

- [ ] 添加博客详情页
- [ ] 实现评论功能
- [ ] 添加深色模式
- [x] 集成RSS订阅
- [ ] 多语言支持

## 联系方式

- **Email**: 1918409681@qq.com
- **网站**: [https://xiaoyulove.xyz/](https://xiaoyulove.xyz/)
- **GitHub**: [https://github.com/xiaoyu012/A-website](https://github.com/xiaoyu012/A-website)

## 许可

MIT © 小遇 
