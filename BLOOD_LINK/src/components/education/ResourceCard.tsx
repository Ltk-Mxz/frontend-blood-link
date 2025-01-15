import React from 'react';
import { Clock, Eye, Heart, Tag } from 'lucide-react';
import { EducationalResource } from '../../types/education';
import { useTranslation } from 'react-i18next';

interface ResourceCardProps {
  resource: EducationalResource;
  onView: (id: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onView }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {resource.thumbnail && (
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {resource.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {t(`education.categories.${resource.category}`)}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {resource.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {resource.readTime} min
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {resource.views}
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {resource.likes}
            </span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            {resource.tags[0]}
          </div>
        </div>

        <button
          onClick={() => onView(resource.id)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('education.readMore')}
        </button>
      </div>
    </div>
  );
};