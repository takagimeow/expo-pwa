export interface CalendarCellData {
  month: number;
  day: number;
}

export interface State {
  year: number;
  month: number;
  monthName: string;
  dates: CalendarCellData[][];
  initialized: boolean;
  selectedDateIndex: number;
}

export type Action =
  | {
      type: 'fetch';
      isUsed: boolean;
    }
  | {
      type: 'changeYear';
      payload: number;
    }
  | {
      type: 'changeMonth';
      payload: number;
    }
  | {
      type: 'changeMonthName';
      payload: string;
    }
  | {
      type: 'changeDates';
      payload: CalendarCellData[][];
    }
  | {
      type: 'changeInitialized';
      payload: boolean;
    }
  | {
      type: 'changeSelectedDateIndex';
      payload: number;
    };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changeYear': {
      return {
        ...state,
        year: action.payload,
      };
    }
    case 'changeMonth': {
      return {
        ...state,
        month: action.payload,
      };
    }
    case 'changeMonthName': {
      return {
        ...state,
        monthName: action.payload,
      };
    }
    case 'changeDates': {
      return {
        ...state,
        dates: action.payload,
      };
    }
    case 'changeInitialized': {
      return {
        ...state,
        initialized: action.payload,
      };
    }
    case 'changeSelectedDateIndex': {
      return {
        ...state,
        selectedDateIndex: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
