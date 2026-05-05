import { getCollection, type CollectionEntry } from 'astro:content'
import { getContentLocale, type Locale } from '../i18n'

const postModules = import.meta.glob('../content/posts/**/*.{md,mdx}')
const categoryModules = import.meta.glob('../content/categories/**/*.{md,mdx}')

export async function getPosts(includeDrafts = false, locale?: Locale): Promise<CollectionEntry<'posts'>[]> {
    if (Object.keys(postModules).length === 0)
        return []

    let posts = ((await getCollection('posts')) ?? []) as CollectionEntry<'posts'>[]

    if (!includeDrafts) {
        posts = posts.filter(post => !post.data.draft)
    }

    if (locale) {
        posts = posts.filter(post => getContentLocale(post) === locale)
    }

    return posts
}

export async function getCategories(locale?: Locale): Promise<CollectionEntry<'categories'>[]> {
    if (Object.keys(categoryModules).length === 0)
        return []

    let categories = ((await getCollection('categories')) ?? []) as CollectionEntry<'categories'>[]
        
    categories = categories.filter(category => !category.data.draft)

    if (locale) {
        categories = categories.filter(category => getContentLocale(category) === locale)
    }

    return categories
}

export function sortPostsByDate(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
    return posts.sort(
        (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    )
}
