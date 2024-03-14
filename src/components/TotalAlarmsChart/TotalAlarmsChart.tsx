import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAlarms } from "../../hooks/useAlarms";
import { aggregateChartData } from "../../utils/aggregateChartData";

const TotalAlarmsChart = () => {
  const { alarms, isLoading, error } = useAlarms("weekly");
  const aggregatedData = useMemo(() => aggregateChartData(alarms, "date"), [alarms]);
  console.count("TotalAlarmsChart");
  return isLoading ? (
    <div>loading..</div>
  ) : (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">
        Total Missiles vs Total Hostile
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        {error ? (
          <div className="text-red-500">
            Error loading data: {error.message}
          </div>
        ) : (
          <LineChart
            data={aggregatedData}
            margin={{
              top: 5,
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
            <Line
              type="monotone"
              dataKey="Missiles"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Hostile" stroke="#82ca9d" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TotalAlarmsChart;
