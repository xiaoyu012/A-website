import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogPostClient from './BlogPostClient';
import { blogPosts, getBlogPostMeta, getPrevNextPosts } from './blogData';
import { siteMetadata } from '../../lib/siteMetadata';
import { getBlogContent } from './blogContent';

// 生成静态路径
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// 生成元数据用于 SEO
export async function generateMetadata({ params }) {
  const postMeta = getBlogPostMeta(params.slug);
  
  if (!postMeta) {
    return {
      title: '文章不存在',
    };
  }

  const siteUrl = siteMetadata.siteUrl;
  const postUrl = `${siteUrl}/blog/${params.slug}`;
  const imageUrl = postMeta.imageUrl ? `${siteUrl}${postMeta.imageUrl}` : `${siteUrl}/og-image.jpg`;
  const twitterHandle = siteMetadata.social?.twitter ?? '@xiaoyulove';

  return {
    title: postMeta.title,
    description: postMeta.excerpt,
    keywords: postMeta.tags,
    authors: [{ name: postMeta.author }],
    openGraph: {
      type: 'article',
      locale: 'zh_CN',
      url: postUrl,
      title: postMeta.title,
      description: postMeta.excerpt,
      siteName: siteMetadata.siteName,
      publishedTime: postMeta.date,
      authors: [postMeta.author],
      tags: postMeta.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: postMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postMeta.title,
      description: postMeta.excerpt,
      images: [imageUrl],
      creator: twitterHandle,
    },
    alternates: {
      canonical: postUrl,
      types: {
        'application/rss+xml': `${siteUrl}/rss.xml`,
        'application/atom+xml': `${siteUrl}/atom.xml`,
      },
    },
  };
}

// 获取博客文章数据
function getBlogPost(slug) {
  const postMeta = getBlogPostMeta(slug);
  if (!postMeta) {
    return null;
  }

  const content = getBlogContent(slug);
  
  return {
    ...postMeta,
    content,
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  const { prevPost, nextPost } = getPrevNextPosts(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">404</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">文章不存在或已被移除</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回博客首页
          </Link>
        </div>
      </div>
    );
  }

  // 生成结构化数据 (JSON-LD) 用于 SEO
  const siteUrl = siteMetadata.siteUrl;
  const siteName = siteMetadata.siteName;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? `${siteUrl}${post.imageUrl}` : `${siteUrl}/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'zh-CN',
    url: `${siteUrl}/blog/${params.slug}`,
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <BlogPostClient post={post} prevPost={prevPost} nextPost={nextPost} />
      <Footer />
    </>
  );
}
