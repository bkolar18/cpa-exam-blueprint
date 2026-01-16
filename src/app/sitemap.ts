import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'

const BASE_URL = 'https://meridiancpareview.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/state-requirements`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Section guide pages
  const sections = ['far', 'aud', 'reg', 'tcp', 'bar', 'isc']
  const sectionPages: MetadataRoute.Sitemap = sections.map((section) => ({
    url: `${BASE_URL}/sections/${section}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guides/failed-section`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Blog posts (dynamically generated)
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = getAllPosts()
    blogPosts = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Blog posts might not exist yet
    console.log('No blog posts found for sitemap')
  }

  return [...staticPages, ...sectionPages, ...guidePages, ...blogPosts]
}
