import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPostMeta, BlogPost } from './types';

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }
  return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    title: data.title || '',
    description: data.description || '',
    author: data.author || 'Meridian CPA Review Team',
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    category: data.category || 'study-tips',
    tags: data.tags || [],
    readingTime: Math.ceil(stats.minutes),
    featured: data.featured || false,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: BlogPostMeta['category']): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
