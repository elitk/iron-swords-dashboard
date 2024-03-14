export interface Alarm {
  data: string;
  date: string;
  time: string;
  alertDate: string;
  category: number;
  category_desc: string;
  matrix_id: number;
  rid: number;
}

export type AlarmChartData = {
  name: string;
  Missiles: number;
  Hostile: number;
};