import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { BloodType } from '../../types';
import { AlertTriangle, BarChart2, Clock, MapPin } from 'lucide-react';

const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const AdminDashboard: React.FC = () => {
  const { user, createShortageAlert, getBloodTypeStats } = useAuthStore();
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType>('O+');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [message, setMessage] = useState('');
  const [expiresIn, setExpiresIn] = useState('24');

  const stats = getBloodTypeStats();

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(expiresIn));

    createShortageAlert({
      bloodType: selectedBloodType,
      urgency,
      location: user?.location || 'Central Hospital',
      message,
      expiresAt: expiresAt.toISOString(),
    });

    setMessage('');
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hospital Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                Create Shortage Alert
              </h2>
              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Type
                  </label>
                  <select
                    value={selectedBloodType}
                    onChange={(e) => setSelectedBloodType(e.target.value as BloodType)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {BLOOD_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Enter details about the shortage..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expires In (hours)
                  </label>
                  <select
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create Alert
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart2 className="h-6 w-6 text-blue-500 mr-2" />
                Blood Type Statistics
              </h2>
              <div className="space-y-3">
                {Object.entries(stats).map(([type, count]) => (
                  <div key={type} className="flex items-center">
                    <span className="w-12 font-medium text-gray-700">{type}</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${(count / 20) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{count} donors</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-green-500 mr-2" />
                Location Coverage
              </h2>
              <div className="text-gray-600">
                <p>Currently serving: {user?.location}</p>
                <p className="mt-2">Active donors in area: 77</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};