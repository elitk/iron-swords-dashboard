import { Alarm, AlarmChartData } from "../types";
import { shortDays } from "./convertDateToDay";

export function aggregateChartData(data: Alarm[], key?: keyof Alarm): AlarmChartData[] {
  const aggregateAlarms: Map<string, AlarmChartData> = new Map();

  data.forEach((item) => {
    const { category_desc } = item;

    const alarmDate = item[key as keyof Alarm] as string;
    const categoryName = !key
      ? category_desc
      : alarmDate.includes("T")
      ? shortDays[new Date(alarmDate).getDay()]
      : alarmDate;

    const alarmCategory = category_desc === "Missiles" ? "Missiles" : "Hostile";

    const categoryData = aggregateAlarms.get(categoryName) || {
      name: categoryName,
      Missiles: 0,
      Hostile: 0,
    };
    categoryData[alarmCategory] += 1;

    aggregateAlarms.set(categoryName, categoryData);
  });
  console.log({ aggregateAlarms });

  return Array.from(aggregateAlarms.values()).sort(
    (a, b) => shortDays.indexOf(a.name) - shortDays.indexOf(b.name)
  );
}

