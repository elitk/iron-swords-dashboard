import { Alarm, AlarmChartData } from "../types";
import { shortDays } from "./convertDateToDay";

const allCategories = [
  "Missiles",
  "Terrorist infiltration",
  "Hostile aircraft intrusion",
];
export function aggregateChartData(data: Alarm[], key?: keyof Alarm) {
  const aggregateAlarms = new Map();

  data.forEach((item) => {
    const { category_desc } = item;

    const alarmDate = item[key as keyof Alarm] as string;
    const categoryName = alarmDate.includes("T")
      ? shortDays[new Date(alarmDate).getDay()]
      : alarmDate;

    let categoryData = aggregateAlarms.get(categoryName);

    if (!categoryData) {
      categoryData = { name: categoryName };
      allCategories.forEach((category) => {
        categoryData[category] = 0;
      });
    }
    categoryData[category_desc] += 1;

    aggregateAlarms.set(categoryName, categoryData);
  });

  return Array.from(aggregateAlarms.values()).sort(
    (a, b) => shortDays.indexOf(a.name) - shortDays.indexOf(b.name)
  );
}

export const aggregateAlarmsByHour = (
  data: Alarm[]
): { hour: string; count: number }[] => {
  const countsByHour = new Map<string, number>();

  data.forEach((alarm) => {
    const hourNumber = new Date(alarm.alertDate).getHours().toString();
    const hour =
      hourNumber.length === 1 ? `0${hourNumber}:00` : `${hourNumber}:00`;
    const currentCount = countsByHour.get(hour) || 0;
    countsByHour.set(hour, currentCount + 1);
  });

  return Array.from(countsByHour, ([hour, count]) => ({ hour, count })).sort(
    (a, b) => parseInt(a.hour) - parseInt(b.hour)
  );
};
