import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Alarm } from "../types";
import { AlarmPeriod } from "../types/alarms";
import { fetchAlarmsHistory, fetchAlarmsByPeriod } from "../api/alarmsApi";

interface AlarmsContextType {
  currentAlarms: Alarm[];
  historicalAlarms: Alarm[];
  isLoading: boolean;
  error: Error | null;
  fetchAlarms: (period: AlarmPeriod) => void;
}

const AlarmsContext = createContext<AlarmsContextType>({
  currentAlarms: [],
  historicalAlarms: [],
  isLoading: false,
  error: null,
  fetchAlarms: () => {},
});

export const useAlarmsContext = () => {
  return useContext(AlarmsContext);
};

interface AlarmsProviderProps {
  children: React.ReactNode;
}

export const AlarmsProvider = ({ children }: AlarmsProviderProps) => {
  const [currentAlarms, setCurrentAlarms] = useState<Alarm[]>([]);
  const [historicalAlarms, setHistoricalAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlarms = useCallback(async (period: AlarmPeriod) => {
    if (period) {
      setIsLoading(true);
      setError(null);
      try {
        const [currentResponse, historyResponse] = await Promise.all([
          fetchAlarmsByPeriod(period),
          fetchAlarmsHistory(period)
        ]);
        console.log(currentResponse);

        const currentAlarmsData = currentResponse?.alarms || [];
        const historyAlarmsData = historyResponse?.alarms || [];

        const sortByDate = (a: Alarm, b: Alarm) => {
          if (a.alertDate && b.alertDate) {
            return new Date(b.alertDate).getTime() - new Date(a.alertDate).getTime();
          }
          return 0;
        };

        const sortedCurrentAlarms = [...currentAlarmsData].sort(sortByDate);
        const sortedHistoryAlarms = [...historyAlarmsData].sort(sortByDate);

        setCurrentAlarms(sortedCurrentAlarms);
        setHistoricalAlarms(sortedHistoryAlarms);
      } catch (err) {
        console.error('Error fetching alarms:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAlarms(AlarmPeriod.WEEKLY);
    fetchAlarmsHistory(AlarmPeriod.LAST_WEEK)

  }, [fetchAlarms]);

  const contextValue = React.useMemo(() => ({
    currentAlarms,
    historicalAlarms,
    isLoading,
    error,
    fetchAlarms
  }), [currentAlarms, historicalAlarms, isLoading, error, fetchAlarms]);

  return (
    <AlarmsContext.Provider value={contextValue}>
      {children}
    </AlarmsContext.Provider>
  );
};
