import { CALENDAR_MONTH_CHANGE, CALENDAR_SELECTED_CELL_ID_CHANGE } from 'constants/Redux';

export const changeCalendarMonth = (month: number) => {
  return {
    type: CALENDAR_MONTH_CHANGE,
    payload: month,
  };
};
export const changeSelectedCalendarCell = (selectedCellId: string) => {
  return {
    type: CALENDAR_SELECTED_CELL_ID_CHANGE,
    payload: selectedCellId,
  };
};
