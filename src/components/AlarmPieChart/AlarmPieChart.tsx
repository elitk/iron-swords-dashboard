import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useAlarms } from "../../hooks/useAlarms";

type CategoryCount = {
  [category: string]: {
    name: string;
    value: number;
  };
};

const COLORS = ["#8984d8", "#82ca9e", "#FFBB28", "#FF8042"];

const AlarmPieChart = () => {
  const { alarms, isLoading } = useAlarms("weekly");
  const categoryCounts = alarms.reduce<CategoryCount>((acc, item) => {
    const category = item.category_desc;
    if (acc[category]) {
      acc[category].value += 1;
    } else {
      acc[category] = { name: category, value: 1 };
    }
    return acc;
  }, {});

  const pieChartData = Object.values(categoryCounts);

  console.log(pieChartData);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">
        Total Missiles vs Total Hostile
      </h3>
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AlarmPieChart;
