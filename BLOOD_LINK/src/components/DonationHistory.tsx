import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DonationHistory: React.FC = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  if (!user?.donationHistory.length) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-300">
          {t('dashboard.donations.noDonations')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {user.donationHistory.map((donation) => (
        <div
          key={donation.id}
          className="bg-white dark:bg-gray-700/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="font-medium text-gray-800 dark:text-white">
                {new Date(donation.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-600 dark:text-gray-300">{donation.location}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('dashboard.donations.nextEligible')}{' '}
            {new Date(donation.nextEligibleDate).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};