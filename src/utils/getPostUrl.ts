import type { CollectionEntry } from 'astro:content';

export function getPostUrl(post: CollectionEntry<'posts'>): string {
  return post.data.uid ? `/posts/${post.data.uid}` : `/posts/${post.slug}`;
} 