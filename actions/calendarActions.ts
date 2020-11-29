import {
  CALENDAR_MONTH_CHANGE,
  CALENDAR_SELECTED_CELL_ID_CHANGE,
  CALENDAR_REFRESHED_DATE_CHANGE,
  CALENDAR_IS_INITIALIZED_CHANGE,
} from 'constants/Redux';

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
export const changeCalendarRefreshedDate = (refreshedDate: number) => {
  return {
    type: CALENDAR_REFRESHED_DATE_CHANGE,
    payload: refreshedDate,
  };
};

export const changeIsCalendarInitialized = (isInitialized: boolean) => {
  return {
    type: CALENDAR_IS_INITIALIZED_CHANGE,
    payload: isInitialized,
  };
};
