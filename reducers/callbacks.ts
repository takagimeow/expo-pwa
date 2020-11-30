/**
 * dateに基づいてcalendarCellIdを生成する
 */
export const createCalendarCellId = (date: Date) => {
  return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
};

export const timeConverter = (hours: number, minutes: number): string => {
  const a = hours < 10 ? `0${hours}` : `${hours}`;
  const b = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${a}:${b}`;
};
