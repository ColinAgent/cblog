import type { NavigationLink, Site, User } from './types.ts'

export const SITE: Site = {
    author: 'ColinAgent',
    url: 'https://github.com/ColinAgent/cblog',
    title: "ColinAgent's Blog",
    description: ' ',
    shortDescription: 'Personal notes and articles by ColinAgent.',
    pageSize: 9,
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'Categories', url: '/categories' },
    { name: 'About', url: '/about' },
    // { name: 'Friends', url: '/friends' },
]

export const Friends: User[] = [
    {
        avatar: 'https://x.com/ColinAgent9527',
        social: { twitter: 'ColinAgent9527', blog: '', github: '' },
        title: '',
        name: '',
        description: '',
    },
    {
        avatar: '',
        social: { twitter: '', blog: '', github: 'draveness' },
        title: '',
        name: '',
        description: '',
    },
    {
        avatar: 'https://bitcoin.org/',
        social: { twitter: '', github: '' },
        title: '',
        name: '',
        description: '',
    },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts' },
            { name: 'Timeline', url: '/timeline' },
            { name: 'Categories', url: '/categories' },
            { name: 'About Me', url: '/about' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'X', url: 'https://x.com/ColinAgent9527' },
        ],
    },
]

export const GoogleAnalytics = {
    enable: true,
    id: 'G-TKQ4L3ZDSF',
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}
