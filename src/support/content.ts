import { getCollection, type CollectionEntry } from 'astro:content'

const postModules = import.meta.glob('../content/posts/**/*.{md,mdx}')
const categoryModules = import.meta.glob('../content/categories/**/*.{md,mdx}')

export async function getPosts(includeDrafts = false): Promise<CollectionEntry<'posts'>[]> {
    if (Object.keys(postModules).length === 0)
        return []

    const posts = ((await getCollection('posts')) ?? []) as CollectionEntry<'posts'>[]
    return includeDrafts ? posts : posts.filter(post => !post.data.draft)
}

export async function getCategories(): Promise<CollectionEntry<'categories'>[]> {
    if (Object.keys(categoryModules).length === 0)
        return []

    const categories = ((await getCollection('categories')) ?? []) as CollectionEntry<'categories'>[]
    return categories.filter(category => !category.data.draft)
}
