import { useMemo } from "react";
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

import { aggregateChartData } from "../../utils/aggregateChartData";
import { useAlarmsContext } from "../../context/AlarmsContext";
const WeeklyAlarmsChart = () => {
  const { currentAlarms, isLoading } = useAlarmsContext();
  const aggregatedData = useMemo(
    () => aggregateChartData(currentAlarms, "alertDate"),
    [currentAlarms]
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
          <Bar dataKey="Hostile aircraft intrusion" fill="#82ca9d" />
          <Bar dataKey="Terrorist infiltration" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeeklyAlarmsChart;
