import type { CollectionEntry } from 'astro:content'
import type { NavigationLink } from './types'

export const LOCALES = ['zh', 'en'] as const
export type Locale = typeof LOCALES[number]

export const DEFAULT_LOCALE: Locale = 'zh'

export const LOCALE_LABELS: Record<Locale, string> = {
    zh: '中文',
    en: 'English',
}

export const HTML_LANG: Record<Locale, string> = {
    zh: 'zh-CN',
    en: 'en',
}

export const UI = {
    zh: {
        nav: {
            posts: '文章',
            timeline: '时间线',
            categories: '分类',
            about: '关于',
        },
        footer: {
            blog: '博客',
            other: '其他',
            aboutMe: '关于我',
            rss: 'RSS',
            sitemap: '站点地图',
        },
        common: {
            readMore: '继续阅读',
            posts: '篇文章',
            previous: '上一页',
            next: '下一页',
            goToList: '返回列表',
            updated: '更新于',
            noPosts: '还没有文章。准备好后，把 Markdown 或 MDX 文件添加到 src/content/posts。',
            noCategories: '还没有分类。添加分类和文章后，它们会显示在这里。',
        },
        pages: {
            homeTitle: '首页',
            homeDescription: '最新发布的文章',
            latestPosts: '最新文章',
            postsTitle: '文章',
            postsDescription: (count: number) => `我发布过的所有文章。（${count}）`,
            categoriesTitle: '分类',
            categoriesDescription: '',
            timelineTitle: '时间线',
            timelineDescription: (count: number) => `目前共有 ${count} 篇文章，继续保持。`,
            aboutTitle: '关于',
            aboutSubtitle: '关于这个博客的简短介绍。',
            aboutBody: '这里会持续记录 AI 工程、知识管理和产品实践。',
        },
    },
    en: {
        nav: {
            posts: 'Posts',
            timeline: 'Timeline',
            categories: 'Categories',
            about: 'About',
        },
        footer: {
            blog: 'Blog',
            other: 'Other',
            aboutMe: 'About Me',
            rss: 'RSS',
            sitemap: 'Site Map',
        },
        common: {
            readMore: 'Read more',
            posts: 'posts',
            previous: 'Previous',
            next: 'Next',
            goToList: 'Go to List',
            updated: 'updated',
            noPosts: 'No posts yet. Add new Markdown or MDX files to src/content/posts when you are ready.',
            noCategories: 'No categories yet. They will appear here after you add categories and posts.',
        },
        pages: {
            homeTitle: 'Home',
            homeDescription: 'The new blog homepage',
            latestPosts: 'Latest Posts',
            postsTitle: 'Posts',
            postsDescription: (count: number) => `All the articles I've posted. (${count})`,
            categoriesTitle: 'Categories',
            categoriesDescription: '',
            timelineTitle: 'Timeline',
            timelineDescription: (count: number) => `There are ${count} posts so far. Keep going 💪`,
            aboutTitle: 'About',
            aboutSubtitle: 'A brief introduction to the new blog.',
            aboutBody: 'This blog collects notes about AI engineering, knowledge management, and product practice.',
        },
    },
} as const

export function isLocale(value: string | undefined): value is Locale {
    return LOCALES.includes(value as Locale)
}

export function normalizeLocale(value: string | undefined): Locale {
    return isLocale(value) ? value : DEFAULT_LOCALE
}

export function getLocaleFromPath(pathname: string): Locale {
    const firstSegment = pathname.split('/').filter(Boolean)[0]
    return normalizeLocale(firstSegment)
}

export function getContentLocale(entryOrSlug: CollectionEntry<'posts'> | CollectionEntry<'categories'> | string): Locale {
    const slug = typeof entryOrSlug === 'string' ? entryOrSlug : entryOrSlug.slug
    const firstSegment = slug.split('/').filter(Boolean)[0]
    return normalizeLocale(firstSegment)
}

export function getContentSlug(entryOrSlug: CollectionEntry<'posts'> | CollectionEntry<'categories'> | string): string {
    const slug = typeof entryOrSlug === 'string' ? entryOrSlug : entryOrSlug.slug
    const segments = slug.split('/').filter(Boolean)

    if (isLocale(segments[0])) {
        return segments.slice(1).join('/')
    }

    return slug
}

export function getLocalePath(locale: Locale, path = ''): string {
    const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '')
    return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}/`
}

export function getHomeUrl(locale: Locale): string {
    return getLocalePath(locale)
}

export function getPostsUrl(locale: Locale): string {
    return getLocalePath(locale, 'posts')
}

export function getPostsPageUrl(locale: Locale, page = 1): string {
    return getLocalePath(locale, `posts/${page}`)
}

export function getTimelineUrl(locale: Locale): string {
    return getLocalePath(locale, 'timeline')
}

export function getCategoriesUrl(locale: Locale): string {
    return getLocalePath(locale, 'categories')
}

export function getCategoryUrl(locale: Locale, slug: string): string {
    return getLocalePath(locale, `categories/${getContentSlug(slug)}`)
}

export function getAboutUrl(locale: Locale): string {
    return getLocalePath(locale, 'about')
}

export function getRssUrl(locale: Locale): string {
    return getLocalePath(locale, 'rss.xml')
}

export function getNavigationLinks(locale: Locale): NavigationLink[] {
    const t = UI[locale]
    return [
        { name: t.nav.posts, url: getPostsUrl(locale) },
        { name: t.nav.timeline, url: getTimelineUrl(locale) },
        { name: t.nav.categories, url: getCategoriesUrl(locale) },
        { name: t.nav.about, url: getAboutUrl(locale) },
    ]
}

export function getFooterLinks(locale: Locale) {
    const t = UI[locale]
    return [
        {
            section: t.footer.blog,
            links: [
                { name: t.nav.posts, url: getPostsUrl(locale) },
                { name: t.nav.timeline, url: getTimelineUrl(locale) },
                { name: t.nav.categories, url: getCategoriesUrl(locale) },
                { name: t.footer.aboutMe, url: getAboutUrl(locale) },
            ],
        },
        {
            section: t.footer.other,
            links: [
                { name: t.footer.rss, url: getRssUrl(locale) },
                { name: t.footer.sitemap, url: '/sitemap-index.xml' },
                { name: 'X', url: 'https://x.com/ColinAgent9527' },
            ],
        },
    ]
}

export function getAlternateLocaleUrl(pathname: string, targetLocale: Locale): string {
    const segments = pathname.split('/').filter(Boolean)

    if (isLocale(segments[0])) {
        segments[0] = targetLocale
    }
    else {
        segments.unshift(targetLocale)
    }

    return `/${segments.join('/')}${pathname.endsWith('/') ? '/' : ''}`
}
