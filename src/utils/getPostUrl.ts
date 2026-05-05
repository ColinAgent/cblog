import type { CollectionEntry } from 'astro:content'
import { getContentLocale, getContentSlug, getLocalePath } from '../i18n'

export function getPostUrl(post: CollectionEntry<'posts'>): string {
    return getLocalePath(getContentLocale(post), `posts/${getContentSlug(post)}`)
}
