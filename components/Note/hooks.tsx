import { changeSelectedCalendarCell } from 'actions/calendarActions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLogic = () => {
  const calendarCellId: string = useSelector((state: any) => state.calendar.selectedCalendarCellId);
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(changeSelectedCalendarCell(calendarCellId));
  };

  return {
    calendarCellId,
    handlePress,
  };
};
