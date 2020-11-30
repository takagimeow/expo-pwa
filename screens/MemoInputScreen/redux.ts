import { Label } from 'constants/Calendar';

export interface State {
  labelId: string;
  labels: Label[];
}

export type Action =
  | {
      type: 'changeLabelId';
      payload: string;
    }
  | {
      type: 'changeLabels';
      payload: Label[];
    };
export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changeLabelId': {
      return {
        ...state,
        labelId: action.payload,
      };
    }
    case 'changeLabels': {
      return {
        ...state,
        labels: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
