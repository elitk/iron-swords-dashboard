import { useMemo } from "react";
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
import { aggregateChartData } from "../../utils/aggregateChartData";
import { useAlarmsContext } from "../../context/AlarmsContext";

const TotalAlarmsChart = () => {
  const { currentAlarms, error, isLoading } = useAlarmsContext();
  
  const aggregatedData = useMemo(() => {
    if (!currentAlarms || !Array.isArray(currentAlarms)) return [];
    return aggregateChartData(currentAlarms, "date");
  }, [currentAlarms]);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">Total Alarms</h3>

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
            <Line
              type="monotone"
              dataKey="Hostile aircraft intrusion"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Terrorist infiltration"
              stroke="#FFBB28"
              activeDot={{ r: 8 }}
            />
          </LineChart>
          
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TotalAlarmsChart;
