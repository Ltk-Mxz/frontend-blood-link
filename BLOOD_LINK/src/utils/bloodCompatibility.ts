import { BloodType } from '../types';

export const bloodCompatibilityMap: Record<BloodType, BloodType[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export const canDonateTo = (donorType: BloodType, recipientType: BloodType): boolean => {
  return bloodCompatibilityMap[donorType].includes(recipientType);
};

export const calculateNextEligibleDate = (donationDate: string): string => {
  const date = new Date(donationDate);
  date.setDate(date.getDate() + 56); // 56 days (8 weeks) is the typical waiting period
  return date.toISOString().split('T')[0];
};