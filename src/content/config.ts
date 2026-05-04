import { defineCollection, z } from 'astro:content'
// import { Categories } from '../config.ts'
// const slugs = Categories.map(c => c.slug)
// const categories = z.enum(slugs as [string, ...string[]])

const posts = defineCollection({
    schema: ({ image }) => z.object({
        uid: z.string().optional(),
        title: z.string(),
        description: z.string(),
        cardImage: image().optional().refine((img) => {
            if (!img) return true;
            try {
                return true; // Simplified image validation
            } catch (e) {
                return false;
            }
        }, {
            message: 'Invalid card image',
        }),
        cardImage2: image().optional(),
        ogImage: z.union([
            image(),
            z.string()
        ]).optional(),
        category: z.string(),
        pubDate: z.coerce.date(),
        selected: z.boolean().optional(),
        draft: z.boolean().optional(),
        oldViewCount: z.number().optional(),
        tags: z.array(z.string()).optional(),
        updatedDate: z.coerce.date().optional(),
    }),
})

const categoryCollection = defineCollection({
    type: 'content',
    schema: () => z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        draft: z.boolean().optional(),
        updatedDate: z.coerce.date().optional(),
    }),
})

export const collections = { posts, categories: categoryCollection }
