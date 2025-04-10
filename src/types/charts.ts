import { Alarm } from "./index";

export type CategoryCount = {
  [category: string]: {
    name: string | number;
    value: number;
  };
};

export type AlarmPieChartProps = {
  title: string;
  category: keyof Alarm;
}; 