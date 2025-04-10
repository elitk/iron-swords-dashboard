export enum AlarmPeriod {
  DAILY = "daily",
  LAST_DAY = "last-day",
  WEEKLY = "weekly",
  LAST_WEEK = "last-week",
  MONTHLY = "monthly",
  LAST_MONTH = "last-month",
  YEARLY = "yearly",
  LAST_YEAR = "last-year"
}

export type Alarm = {
  id: string;
  alertDate: string;
  category: string;
  subCategory: string;
  location: string;
  description: string;
  source: string;
  severity: string;
  status: string;
}; 