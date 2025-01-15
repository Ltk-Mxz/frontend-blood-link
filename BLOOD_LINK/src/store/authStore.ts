import create from "zustand";

import {
  AuthState,
  BloodType,
  DonationRecord,
  BloodShortage,
  User,
} from "../types";
import { toast } from "react-hot-toast";
import { calculateNextEligibleDate } from "../utils/bloodCompatibility";

const mockAdmin: User = {
  id: "admin1",
  name: "Hospital Admin",
  email: "admin@hospital.com",
  bloodType: "O+",
  notificationsEnabled: true,
  donationHistory: [],
  role: "admin",
  location: "Central Hospital",
};

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  bloodType: "O+",
  notificationsEnabled: true,
  donationHistory: [
    {
      id: "1",
      date: "2024-02-15",
      location: "Central Blood Bank",
      bloodType: "O+",
      nextEligibleDate: "2024-04-11",
    },
  ],
  role: "user",
  location: "Downtown",
};

// Mock data for blood shortages
let bloodShortages: BloodShortage[] = [];

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: async (credentials) => {
    try {
      const data = await login(credentials);
      set({ user: data.user, token: data.token });
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const data = await register(userData);
      set({ user: data.user, token: data.token });
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    delete api.defaults.headers.common["Authorization"];
  },
}));

export default useAuthStore;
