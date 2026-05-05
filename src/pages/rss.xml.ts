import rss from '@astrojs/rss'
import type { CollectionEntry } from 'astro:content'
import { SITE } from '../config.ts'
import { getPosts, sortPostsByDate } from '../support/content'
import { getPostUrl } from '../utils/getPostUrl'

export async function GET() {
    const posts: CollectionEntry<'posts'>[] = sortPostsByDate(await getPosts())

    return rss({
        title: SITE.title,
        description: SITE.description,
        site: SITE.url,
        items: posts.map(post => ({
            ...post.data,
            link: getPostUrl(post),
        })),
    })
}
