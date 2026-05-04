import rss from '@astrojs/rss'
import type { CollectionEntry } from 'astro:content'
import { SITE } from '../config.ts'
import { getPosts } from '../support/content'

export async function GET() {
    const posts: CollectionEntry<'posts'>[] = (await getPosts()).sort(
        (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    )

    return rss({
        title: SITE.title,
        description: SITE.description,
        site: SITE.url,
        items: posts.map(post => ({
            ...post.data,
            link: `/posts/${post.slug}/`,
        })),
    })
}
