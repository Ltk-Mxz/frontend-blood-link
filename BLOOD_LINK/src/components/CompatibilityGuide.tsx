import React from 'react';
import { BloodType } from '../types';
import { bloodCompatibilityMap } from '../utils/bloodCompatibility';
import { Droplet } from 'lucide-react';

export const CompatibilityGuide: React.FC<{ userBloodType: BloodType }> = ({ userBloodType }) => {
  const canDonateTo = bloodCompatibilityMap[userBloodType];
  const canReceiveFrom = Object.entries(bloodCompatibilityMap)
    .filter(([_, recipients]) => recipients.includes(userBloodType))
    .map(([donor]) => donor as BloodType);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Blood Compatibility Guide</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 flex items-center">
            <Droplet className="h-5 w-5 text-red-500 mr-2" />
            You can donate to:
          </h4>
          <div className="flex flex-wrap gap-2">
            {canDonateTo.map((type) => (
              <span
                key={type}
                className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 flex items-center">
            <Droplet className="h-5 w-5 text-blue-500 mr-2" />
            You can receive from:
          </h4>
          <div className="flex flex-wrap gap-2">
            {canReceiveFrom.map((type) => (
              <span
                key={type}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};