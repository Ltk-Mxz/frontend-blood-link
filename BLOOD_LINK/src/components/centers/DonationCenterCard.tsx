import React from 'react';
import { DonationCenter } from '../../types/donationCenter';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DonationCenterCardProps {
  center: DonationCenter;
  onBookAppointment: (centerId: string) => void;
}

export const DonationCenterCard: React.FC<DonationCenterCardProps> = ({
  center,
  onBookAppointment,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{center.name}</h3>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-gray-600 dark:text-gray-300">
            {center.rating} ({center.reviews})
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MapPin className="h-5 w-5 mr-2 text-gray-400" />
          <span>{center.address}, {center.city}</span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Phone className="h-5 w-5 mr-2 text-gray-400" />
          <span>{center.phone}</span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          <span>{center.openingHours['monday']}</span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onBookAppointment(center.id)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('centers.bookAppointment')}
        </button>
      </div>
    </div>
  );
};