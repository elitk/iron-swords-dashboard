import axios from 'axios';
import { Alarm } from '../types';

const API_BASE_URL = 'http://localhost:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAlarmsHistory = async (period: string): Promise<{ alarms: Alarm[] }> => {
  try {
    // Convert period to match backend route
    const route = period === 'daily' ? 'last-day' :
                 period === 'weekly' ? 'last-week' :
                 'last-month';
                 
    const response = await api.get(`/alarms/${route}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alarms history:', error);
    throw error;
  }
};

export const fetchAlarmsByPeriod = async (period: string): Promise<{ alarms: Alarm[] }> => {
  try {
    const response = await api.get(`/alarms/${period}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alarms by period:', error);
    throw error;
  }
};
