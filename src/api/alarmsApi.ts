import { Alarm } from "../types";
import { apiInstance } from "./config";

interface AlarmHistoryResponse {
  alarms: Alarm[];
}

export const fetchAlarmsHistory = async (
  period: string
): Promise<AlarmHistoryResponse> => {
  try {
    console.log("Fetching alarms history");
    const response = await apiInstance.get<AlarmHistoryResponse>(
      `/alarms/${period}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts history:", error);
    throw error;
  }
};
