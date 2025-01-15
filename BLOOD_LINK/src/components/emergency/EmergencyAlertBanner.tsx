import React from 'react';
import { AlertTriangle, Clock, MapPin, Phone } from 'lucide-react';
import { EmergencyAlert } from '../../types/emergency';
import { useTranslation } from 'react-i18next';

interface EmergencyAlertBannerProps {
  alert: EmergencyAlert;
  onRespond: (alertId: string) => void;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({
  alert,
  onRespond,
}) => {
  const { t } = useTranslation();

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'urgent':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  return (
    <div className={`${getUrgencyColor(alert.urgencyLevel)} border rounded-lg p-4 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('emergency.urgentNeed')}
          </h3>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          {alert.bloodType.join(', ')}
        </span>
      </div>

      <p className="mt-2 text-gray-600 dark:text-gray-300">{alert.message}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4 mr-1" />
          {alert.hospital}, {alert.location}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(alert.expiresAt).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Phone className="h-4 w-4 mr-1" />
          {alert.contactInfo.phone}
        </div>
      </div>

      <button
        onClick={() => onRespond(alert.id)}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {t('emergency.respond')}
      </button>
    </div>
  );
};