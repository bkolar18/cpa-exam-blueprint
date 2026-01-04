export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: 'study-tips' | 'section-guides' | 'reviews' | 'career' | 'news';
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export const categoryLabels: Record<BlogPostMeta['category'], string> = {
  'study-tips': 'Study Tips',
  'section-guides': 'Section Guides',
  'reviews': 'Reviews',
  'career': 'Career',
  'news': 'News',
};

export const categoryColors: Record<BlogPostMeta['category'], string> = {
  'study-tips': 'bg-blue-100 text-blue-800',
  'section-guides': 'bg-purple-100 text-purple-800',
  'reviews': 'bg-green-100 text-green-800',
  'career': 'bg-orange-100 text-orange-800',
  'news': 'bg-gray-100 text-gray-800',
};
