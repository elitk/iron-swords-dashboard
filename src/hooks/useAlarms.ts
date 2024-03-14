// src/hooks/useAlarms.ts
import { useState, useEffect } from "react";
import { Alarm } from "../types";
import { fetchAlarmsHistory } from "../api/alarmsApi";
export const useAlarms = (period: string) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlarms = async () => {
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
    };

    fetchAlarms();
  }, [period]);

  return { alarms, isLoading, error };
};
