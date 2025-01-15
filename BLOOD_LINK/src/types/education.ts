export interface EducationalResource {
  id: string;
  title: string;
  category: 'guide' | 'faq' | 'article' | 'video';
  content: string;
  thumbnail?: string;
  tags: string[];
  readTime?: number;
  lastUpdated: string;
  likes: number;
  views: number;
}