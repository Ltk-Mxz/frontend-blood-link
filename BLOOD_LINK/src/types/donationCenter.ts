export interface DonationCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    [key: string]: string;
  };
  availableSlots: string[];
  rating: number;
  reviews: number;
}