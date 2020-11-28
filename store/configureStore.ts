import { calendarReducer } from 'reducers/calendarReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  calendar: calendarReducer,
});

export const configureStore = () => {
  return createStore(rootReducer);
};
