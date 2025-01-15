import React from 'react';
import { ResourceCard } from '../education/ResourceCard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const mockResources = [
  {
    id: '1',
    title: 'Blood Donation Guide',
    category: 'guide' as const,
    content: 'Learn everything you need to know about blood donation, from preparation to recovery.',
    thumbnail: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    tags: ['guide', 'basics'],
    readTime: 5,
    lastUpdated: new Date().toISOString(),
    likes: 124,
    views: 1543,
  },
  {
    id: '2',
    title: 'Common Questions About Blood Types',
    category: 'faq' as const,
    content: 'Find answers to frequently asked questions about blood types and compatibility.',
    thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    tags: ['faq', 'blood-types'],
    readTime: 3,
    lastUpdated: new Date().toISOString(),
    likes: 89,
    views: 967,
  },
];

export const EducationPage: React.FC = () => {
  const { t } = useTranslation();

  const handleView = (id: string) => {
    toast.success(t('education.resourceOpened'));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('education.resources')}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {mockResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onView={handleView}
          />
        ))}
      </div>
    </div>
  );
};