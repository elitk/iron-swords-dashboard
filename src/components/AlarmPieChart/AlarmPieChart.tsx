import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useAlarmsContext } from "../../context/AlarmsContext";
import { useMemo, memo, useCallback } from "react";
import { CHART_COLORS } from "../../constants/chartColors";
import { AlarmPieChartProps, CategoryCount } from "../../types/charts";

// Memoize static values outside component
const CHART_DIMENSIONS = {
  width: 400,
  height: 400,
  cx: 200,
  cy: 200,
  outerRadius: 80,
} as const;

const LoadingComponent = memo(() => <div>loading..</div>);
LoadingComponent.displayName = 'LoadingComponent';

function AlarmPieChartComponent({ title, category }: AlarmPieChartProps) {
  const { currentAlarms, historicalAlarms, isLoading } = useAlarmsContext();

  const pieChartData = useMemo(() => {
    // Combine current and historical alarms for the pie chart
    const allAlarms = [...currentAlarms, ...historicalAlarms];
    
    if (!allAlarms || !Array.isArray(allAlarms)) return [];
    
    const categoryCounts = allAlarms.reduce<CategoryCount>((acc, item) => {
      if (!item || typeof item !== 'object') return acc;
      
      const categoryName = item[category];
      if (!categoryName) return acc;
      
      if (acc[categoryName]) {
        acc[categoryName].value += 1;
      } else {
        acc[categoryName] = { name: categoryName, value: 1 };
      }
      return acc;
    }, {});

    return Object.values(categoryCounts);
  }, [currentAlarms, historicalAlarms, category]);

  const renderCustomizedLabel = useCallback(({ name, percent }: { name: string; percent: number }) => {
    if (percent < 0.05) return "";
    const shortName = String(name).split(" ")[0];
    return `${shortName} ${(percent * 100).toFixed(0)}%`;
  }, []);

  const renderCells = useMemo(() => {
    return pieChartData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={CHART_COLORS[index % CHART_COLORS.length]}
        style={{ fontSize: 12, fontWeight: "bold" }}
      />
    ));
  }, [pieChartData]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-5">{title}</h3>
      <PieChart width={CHART_DIMENSIONS.width} height={CHART_DIMENSIONS.height}>
        <Pie
          data={pieChartData}
          cx={CHART_DIMENSIONS.cx}
          cy={CHART_DIMENSIONS.cy}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={CHART_DIMENSIONS.outerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {renderCells}
        </Pie>
        <Tooltip />
        {pieChartData.length < 5 && <Legend />}
      </PieChart>
    </div>
  );
}

AlarmPieChartComponent.displayName = 'AlarmPieChart';

const AlarmPieChart = memo(AlarmPieChartComponent);

export default AlarmPieChart;
