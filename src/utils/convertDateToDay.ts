export const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const convertDateToDay = (date: string, isIndex: boolean) => {
  const dayIndex = new Date(date).getDay();
  return isIndex ? dayIndex : shortDays[dayIndex];
};
