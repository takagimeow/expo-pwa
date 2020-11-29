import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeSelectedCalendarCell } from 'actions/calendarActions';
import { NoteData } from 'components/Note';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLogic = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState<NoteData | null>(null);
  const refreshedDate = useSelector((state: any) => state.calendar.refreshedDate);
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(id);
        const newNote = jsonValue != null ? JSON.parse(jsonValue) : null;
        setNote(newNote);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, refreshedDate]);

  const handlePress = (calendarCellId: string) => {
    dispatch(changeSelectedCalendarCell(calendarCellId));
  };

  return {
    note,
    handlePress,
  };
};
