import type { CollectionEntry } from 'astro:content'

export function getPostUrl(post: CollectionEntry<'posts'>): string {
  return `/posts/${post.slug}`
}
