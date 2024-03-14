
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useAlarms } from "../../hooks/useAlarms";
import { aggregateChartData } from "../../utils/aggregateChartData";
const WeeklyAlarmsChart = () => {
  const { alarms, isLoading } = useAlarms("weekly");
  const aggregatedData = useMemo(
    () => aggregateChartData(alarms, "alertDate"),
    [alarms]
  );
//  if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading data: {error.message}</div>;
//   }
  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">Total Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={aggregatedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Missiles" fill="#8884d8" />
          <Bar dataKey="Hostile" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeeklyAlarmsChart;
