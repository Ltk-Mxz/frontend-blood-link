import React from 'react';
import { EmergencyAlertBanner } from '../emergency/EmergencyAlertBanner';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const mockEmergencyAlerts = [
  {
    id: '1',
    bloodType: ['O+', 'O-'],
    urgencyLevel: 'critical' as const,
    hospital: 'Central Hospital',
    location: 'Downtown',
    message: 'Urgent need for O+ and O- blood types for emergency surgery.',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'emergency@hospital.com',
    },
  },
  {
    id: '2',
    bloodType: ['AB+'],
    urgencyLevel: 'urgent' as const,
    hospital: 'Memorial Hospital',
    location: 'West Side',
    message: 'AB+ blood needed for scheduled procedures.',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    contactInfo: {
      phone: '(555) 987-6543',
      email: 'blood@memorial.com',
    },
  },
];

export const EmergencyPage: React.FC = () => {
  const { t } = useTranslation();

  const handleRespond = (alertId: string) => {
    toast.success(t('emergency.responseConfirmation'));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('emergency.activeAlerts')}
      </h2>
      <div className="space-y-4">
        {mockEmergencyAlerts.map((alert) => (
          <EmergencyAlertBanner
            key={alert.id}
            alert={alert}
            onRespond={handleRespond}
          />
        ))}
      </div>
    </div>
  );
};