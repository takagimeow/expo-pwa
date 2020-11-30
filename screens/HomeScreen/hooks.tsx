import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { changeSelectedCalendarCell, changeIsCalendarInitialized } from 'actions/calendarActions';
import { NoteData } from 'components/Note';
import { labels } from 'constants/Calendar';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeParamList } from 'types';

type Props = StackScreenProps<HomeParamList, 'HomeScreen'>;

export const useLogic = () => {
  const [memo, setMemo] = useState('');
  const calendarCellId: string = useSelector((state: any) => state.calendar.selectedCalendarCellId);
  const refreshedDate: number = useSelector((state: any) => state.calendar.refreshedDate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeIsCalendarInitialized(true));
  }, []);

  useEffect(() => {
    (async () => {
      let note: NoteData | null = null;
      try {
        const jsonValue = await AsyncStorage.getItem(calendarCellId);
        note = jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }
      /**
       * labelsを初期化
       */
      try {
        labels.map(async (label) => {
          const jsonValue = JSON.stringify(label);
          await AsyncStorage.setItem(label.id, jsonValue);
        });
      } catch (err) {
        console.log(err);
      }
      if (_.isNil(note)) {
        setMemo('');
      } else {
        setMemo(note.memo);
        console.log('note.memo: ', note.memo);
      }
    })();
  }, [calendarCellId, refreshedDate]);

  const handlePress = () => {
    dispatch(changeSelectedCalendarCell(calendarCellId));
  };

  return {
    calendarCellId,
    memo,
    handlePress,
  };
};

export const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  return styles;
};
