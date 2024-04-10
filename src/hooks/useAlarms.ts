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
      let comparePeriod = "";
      try {
        switch (period) {
          case "daily":
            comparePeriod = "last-day";
            break;
          case "weekly":
            comparePeriod = "last-week";
            break;
          case "monthly":
            comparePeriod = "last-month";
            break;
          default:
            comparePeriod = "last-week";
            break;
        }
        const response = await fetchAlarmsHistory(comparePeriod);

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
