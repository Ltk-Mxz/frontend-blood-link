import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={t(`theme.${isDark ? 'light' : 'dark'}`)}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
};