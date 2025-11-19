import { siteMetadata } from './lib/siteMetadata';
import { getAllBlogPosts } from './lib/blogPosts';

export default function sitemap() {
  const baseUrl = siteMetadata.siteUrl;
  const blogPosts = getAllBlogPosts();
  const now = new Date().toISOString();

  const staticRoutes = ['/', '/blog', '/about', '/projects', '/contact', '/resources'];

  const staticEntries = staticRoutes.map((path, index) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));

  const postEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const feedEntries = [siteMetadata.feeds?.rss ?? '/rss.xml', siteMetadata.feeds?.atom ?? '/atom.xml'].map((feedPath) => ({
    url: `${baseUrl}${feedPath}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.4,
  }));

  return [...staticEntries, ...postEntries, ...feedEntries];
}
