import { buildAtomFeed, getFeedPosts } from '../lib/feed';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const posts = getFeedPosts(limit);
  const feed = buildAtomFeed(posts);

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
