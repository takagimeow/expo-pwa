import { changeSelectedCalendarCell } from 'actions/calendarActions';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useLogic = () => {
  const dispatch = useDispatch();

  const handlePress = (calendarCellId: string) => {
    dispatch(changeSelectedCalendarCell(calendarCellId));
  };

  return {
    handlePress,
  };
};
