export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UserRole = 'user' | 'admin';

export interface DonationRecord {
  id: string;
  date: string;
  location: string;
  bloodType: BloodType;
  nextEligibleDate: string;
}

export interface BloodShortage {
  id: string;
  bloodType: BloodType;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  message: string;
  createdAt: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  notificationsEnabled: boolean;
  donationHistory: DonationRecord[];
  lastDonation?: DonationRecord;
  role: UserRole;
  location?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, bloodType: BloodType) => void;
  logout: () => void;
  updateNotificationPreferences: (enabled: boolean) => void;
  addDonation: (donation: Omit<DonationRecord, 'id'>) => void;
  createShortageAlert: (shortage: Omit<BloodShortage, 'id' | 'createdAt'>) => void;
  getBloodTypeStats: () => Record<BloodType, number>;
}