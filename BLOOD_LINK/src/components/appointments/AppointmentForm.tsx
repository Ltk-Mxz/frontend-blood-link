import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Calendar, Clock, FileText } from 'lucide-react';

interface AppointmentFormProps {
  centerId: string;
  availableSlots: string[];
  onSubmit: (appointment: {
    date: string;
    time: string;
    notes: string;
    medicalChecklist: {
      recentIllness: boolean;
      medication: boolean;
      lastDonation: string;
    };
  }) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  availableSlots,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [medicalChecklist, setMedicalChecklist] = useState({
    recentIllness: false,
    medication: false,
    lastDonation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      time,
      notes,
      medicalChecklist,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('appointments.date')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('appointments.time')}
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">{t('appointments.selectTime')}</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('appointments.notes')}
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            {t('appointments.medicalChecklist')}
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={medicalChecklist.recentIllness}
                onChange={(e) =>
                  setMedicalChecklist({
                    ...medicalChecklist,
                    recentIllness: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('appointments.recentIllness')}
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={medicalChecklist.medication}
                onChange={(e) =>
                  setMedicalChecklist({
                    ...medicalChecklist,
                    medication: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('appointments.medication')}
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {t('appointments.book')}
      </button>
    </form>
  );
};