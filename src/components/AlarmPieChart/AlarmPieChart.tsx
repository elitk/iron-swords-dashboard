import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Alarm } from "../../types";
import { useAlarmsContext } from "../../context/AlarmsContext";

type CategoryCount = {
  [category: string]: {
    name: string | number;
    value: number;
  };
};

const COLORS = ["#8984d8", "#82ca9e", "#FFBB28", "#FF8042"];

const AlarmPieChart = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => {
  const { alarms, isLoading } = useAlarmsContext();

  const categoryCounts = alarms.reduce<CategoryCount>((acc, item) => {
    const categoryName = item[category as keyof Alarm];
    if (acc[categoryName]) {
      acc[categoryName].value += 1;
    } else {
      acc[categoryName] = { name: categoryName, value: 1 };
    }
    return acc;
  }, {});

  const pieChartData = Object.values(categoryCounts);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">{title} </h3>
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            percent < 0.05
              ? ""
              : `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{ fontSize: 12, fontWeight: "bold" }}
            />
          ))}
        </Pie>
        <Tooltip />
        {pieChartData.length < 5 && <Legend />}
      </PieChart>
    </div>
  );
};

export default AlarmPieChart;
