/**
 * dateに基づいてcalendarCellIdを生成する
 */
export const createCalendarCellId = (date: Date) => {
  return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
};
