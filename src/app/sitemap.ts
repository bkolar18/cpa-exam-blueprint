import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { stateSalaries } from '@/data/state-salaries'
import { getAllStates } from '@/lib/data/state-requirements'

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
    {
      url: `${BASE_URL}/guides/how-to-become-a-cpa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/best-order-cpa-exams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Resource pages
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/cpa-pass-rates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/free-cpa-videos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/free-practice-materials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/best-budget-cpa-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/compare/becker-vs-gleim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/becker-vs-surgent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/surgent-vs-roger`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/wiley-vs-uworld`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/roger-vs-wiley`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare/becker-vs-roger`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Topic deep-dive pages
  const topicPages: MetadataRoute.Sitemap = [
    // FAR Topics
    {
      url: `${BASE_URL}/topics/far/lease-accounting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/far/revenue-recognition`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/far/consolidations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/far/government-accounting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/far/nonprofit-accounting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // REG Topics
    {
      url: `${BASE_URL}/topics/reg/like-kind-exchanges`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/reg/basis-calculations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/reg/partnership-taxation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // AUD Topics
    {
      url: `${BASE_URL}/topics/aud/audit-reports`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/aud/internal-controls`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/topics/aud/audit-evidence`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // State salary pages (programmatic SEO)
  const stateSalaryPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/resources/cpa-salary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...stateSalaries.map((state) => ({
      url: `${BASE_URL}/resources/cpa-salary/${state.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // "How to Become a CPA in [State]" pages (programmatic SEO)
  const allStates = getAllStates()
  const becomeCpaPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guides/become-cpa-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...allStates.map((state) => ({
      url: `${BASE_URL}/guides/become-cpa-in/${state.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
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

  return [...staticPages, ...sectionPages, ...guidePages, ...resourcePages, ...comparisonPages, ...topicPages, ...stateSalaryPages, ...becomeCpaPages, ...blogPosts]
}
