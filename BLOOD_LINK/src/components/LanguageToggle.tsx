import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {i18n.language.startsWith('fr') ? 'FR' : 'EN'}
      </span>
    </button>
  );
};