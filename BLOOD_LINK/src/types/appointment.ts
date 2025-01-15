export interface Appointment {
  id: string;
  userId: string;
  centerId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  medicalChecklist?: {
    recentIllness: boolean;
    medication: boolean;
    lastDonation: string;
  };
}