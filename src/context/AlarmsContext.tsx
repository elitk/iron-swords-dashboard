import React, { createContext, useContext, useState, useEffect } from "react";
import { Alarm } from "../types";
import { fetchAlarmsHistory } from "../api/alarmsApi";

// Create the AlarmsContext
const AlarmsContext = createContext<{
  alarms: Alarm[];
  isLoading: boolean;
  error: Error | null;
  fetchAlarms: (period: string) => void;
}>({
  alarms: [],
  isLoading: false,
  error: null,
  fetchAlarms: () => {},
});

// Custom hook to use the AlarmsContext
export const useAlarmsContext = () => {
  return useContext(AlarmsContext);
};

interface AlarmsProviderProps {
  children: React.ReactNode;
}

// AlarmsProvider component
export const AlarmsProvider = ({ children }: AlarmsProviderProps) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlarms = async (period: string) => {
    if (period) {
      setIsLoading(true);
      try {
        const response = await fetchAlarmsHistory(period);
        console.log({ response });
        setAlarms(response.alarms);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchAlarms("weekly");
  }, []);

  return (
    <AlarmsContext.Provider value={{ alarms, isLoading, error, fetchAlarms }}>
      {children}
    </AlarmsContext.Provider>
  );
};
