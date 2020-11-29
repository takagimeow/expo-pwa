import {
  CALENDAR_MONTH_CHANGE,
  CALENDAR_SELECTED_CELL_ID_CHANGE,
  CALENDAR_REFRESHED_DATE_CHANGE,
} from 'constants/Redux';

const today = new Date();

const INITIAL_STATE = {
  month: today.getMonth() + 1,
  selectedCalendarCellId: '',
  refreshedDate: 0,
};

export const calendarReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any },
): typeof INITIAL_STATE => {
  switch (action.type) {
    case CALENDAR_MONTH_CHANGE:
      return {
        ...state,
        month: action.payload,
      };
    case CALENDAR_SELECTED_CELL_ID_CHANGE:
      return {
        ...state,
        selectedCalendarCellId: action.payload,
      };
    case CALENDAR_REFRESHED_DATE_CHANGE:
      return {
        ...state,
        refreshedDate: action.payload,
      };
    default:
      return state;
  }
};
