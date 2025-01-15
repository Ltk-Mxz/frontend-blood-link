export interface EmergencyAlert {
  id: string;
  bloodType: string[];
  urgencyLevel: 'critical' | 'urgent' | 'moderate';
  hospital: string;
  location: string;
  message: string;
  createdAt: string;
  expiresAt: string;
  contactInfo: {
    phone: string;
    email: string;
  };
}

export interface EmergencyResponse {
  id: string;
  alertId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed';
  responseTime: string;
}