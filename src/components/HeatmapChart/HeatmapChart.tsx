import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { aggregateAlarmsByHour } from "../../utils/aggregateChartData";
import { useAlarmsContext } from "../../context/AlarmsContext";

interface HeatmapChartProps {
  title: string;
}
const HeatmapChart: React.FC<HeatmapChartProps> = ({ title }) => {
  const { currentAlarms, isLoading } = useAlarmsContext();
  const data = !isLoading ? aggregateAlarmsByHour(currentAlarms) : [];

  const getColor = (count: number) => {
    if (count < 5) return "#83a6ed";
    if (count < 10) return "#8dd1e1";
    if (count < 15) return "#82ca9d";
    return "#8884d8";
  };

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">{title}</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.count)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeatmapChart;
