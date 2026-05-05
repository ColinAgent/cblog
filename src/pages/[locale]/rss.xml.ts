import rss from '@astrojs/rss'
import type { CollectionEntry } from 'astro:content'
import { SITE } from '../../config.ts'
import { getPosts, sortPostsByDate } from '../../support/content'
import { LOCALES, UI, getLocalePath, normalizeLocale, type Locale } from '../../i18n'
import { getPostUrl } from '../../utils/getPostUrl'

export function getStaticPaths() {
    return LOCALES.map(locale => ({ params: { locale } }))
}

export async function GET({ params }: { params: { locale?: string } }) {
    const locale: Locale = normalizeLocale(params.locale)
    const posts: CollectionEntry<'posts'>[] = sortPostsByDate(await getPosts(false, locale))
    const t = UI[locale]

    return rss({
        title: `${SITE.title} - ${t.pages.postsTitle}`,
        description: SITE.description,
        site: new URL(getLocalePath(locale), SITE.url).toString(),
        items: posts.map(post => ({
            ...post.data,
            link: getPostUrl(post),
        })),
    })
}
