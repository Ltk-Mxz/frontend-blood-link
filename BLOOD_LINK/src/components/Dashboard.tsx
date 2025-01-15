import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Bell, LogOut, Droplet, PlusCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { DonationHistory } from './DonationHistory';
import { CompatibilityGuide } from './CompatibilityGuide';
import { EmergencyPage } from './pages/EmergencyPage';
import { EducationPage } from './pages/EducationPage';
import { useTranslation } from 'react-i18next';

type TabType = 'dashboard' | 'emergency' | 'education';

export const Dashboard: React.FC = () => {
  const { user, logout, updateNotificationPreferences, addDonation } = useAuthStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  if (!user) return null;

  const handleAddDonation = () => {
    const today = new Date().toISOString().split('T')[0];
    addDonation({
      date: today,
      location: t('dashboard.donations.defaultLocation'),
      bloodType: user.bloodType,
      nextEligibleDate: '',
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'emergency':
        return <EmergencyPage />;
      case 'education':
        return <EducationPage />;
      default:
        return (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {t('dashboard.bloodInfo.title')}
                  </h2>
                </div>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {user.bloodType}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('dashboard.bloodInfo.description')}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {t('dashboard.notifications.title')}
                  </h2>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.notificationsEnabled}
                      onChange={(e) => updateNotificationPreferences(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      {t(user.notificationsEnabled ? 'dashboard.notifications.enabled' : 'dashboard.notifications.disabled')}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <CompatibilityGuide userBloodType={user.bloodType} />

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {t('dashboard.donations.title')}
                </h2>
                <button
                  onClick={handleAddDonation}
                  className="flex items-center px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  {t('dashboard.donations.addDonation')}
                </button>
              </div>
              <DonationHistory />
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('common.welcome')}, {user.name}
          </h1>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            {t('common.signOut')}
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t('common.dashboard')}
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'emergency'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {t('common.emergency')}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'education'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {t('common.education')}
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};