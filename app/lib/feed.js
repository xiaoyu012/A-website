import { siteMetadata } from './siteMetadata';
import { getAllBlogPosts } from './blogPosts';

const MAX_FEED_ITEMS = 50;

function sanitizeLimit(limitParam, total) {
  const fallback = Math.min(MAX_FEED_ITEMS, total);
  if (!limitParam) {
    return fallback;
  }
  const parsed = parseInt(limitParam, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.min(parsed, fallback);
}

function formatRfc822(date) {
  return new Date(date).toUTCString();
}

function formatIso(date) {
  return new Date(date).toISOString();
}

export function getFeedPosts(limitParam) {
  const posts = getAllBlogPosts();
  const limit = sanitizeLimit(limitParam, posts.length);
  return posts.slice(0, limit);
}

export function buildRssFeed(posts) {
  const { siteUrl, siteName, description, language, email, feeds } = siteMetadata;
  const lastBuildDate = posts.length ? formatRfc822(posts[0].updatedDate || posts[0].date) : formatRfc822(new Date());
  const rssSelfLink = `${siteUrl}${feeds?.rss ?? '/rss.xml'}`;

  const items = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const categories = [post.category, ...post.tags]
      .filter(Boolean)
      .map((category) => `      <category><![CDATA[${category}]]></category>`)
      .join('\n');

    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${formatRfc822(post.date)}</pubDate>
      <author>${email} (${post.author})</author>
${categories}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${description}]]></description>
    <language>${language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${email} (${siteMetadata.author})</managingEditor>
    <webMaster>${email} (${siteMetadata.author})</webMaster>
    <ttl>60</ttl>
    <atom:link href="${rssSelfLink}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function buildAtomFeed(posts) {
  const { siteUrl, siteName, description, email, feeds } = siteMetadata;
  const atomSelfLink = `${siteUrl}${feeds?.atom ?? '/atom.xml'}`;
  const updated = posts.length ? formatIso(posts[0].updatedDate || posts[0].date) : formatIso(new Date());

  const entries = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const categories = [post.category, ...post.tags]
      .filter(Boolean)
      .map((category) => `    <category term="${category}" />`)
      .join('\n');

    return `  <entry>
    <title><![CDATA[${post.title}]]></title>
    <id>${postUrl}</id>
    <link href="${postUrl}" />
    <updated>${formatIso(post.updatedDate || post.date)}</updated>
    <published>${formatIso(post.date)}</published>
    <author>
      <name>${post.author}</name>
      <email>${email}</email>
    </author>
    <summary type="html"><![CDATA[${post.excerpt}]]></summary>
${categories}
  </entry>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${siteName}]]></title>
  <id>${atomSelfLink}</id>
  <updated>${updated}</updated>
  <link href="${atomSelfLink}" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}" />
  <subtitle><![CDATA[${description}]]></subtitle>
${entries}
</feed>`;
}

export { MAX_FEED_ITEMS };
