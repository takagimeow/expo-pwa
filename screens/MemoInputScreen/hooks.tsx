import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { changeCalendarRefreshedDate } from 'actions/calendarActions';
import { NoteData } from 'components/Note';
import { getNoteHeaderText } from 'components/Note/callbacks';
import { Label } from 'constants/Calendar';
import _ from 'lodash';
import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HomeParamList } from 'types';
import * as yup from 'yup';

import { reducer } from './redux';

type Props = StackScreenProps<HomeParamList, 'MemoInputScreen'>;

export const useLogic = ({ navigation }: { navigation: Props['navigation'] }) => {
  const [localState, localDispatch] = useReducer(reducer, {
    labelId: '',
    labels: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateText, setDateText] = useState('');
  const [formikSchema] = useState(
    yup.object().shape({
      memo: yup.string().max(144),
    }),
  );
  const [formikInitValues, setFormikInitValues] = useState({
    memo: '',
  });
  const textInputRef: React.MutableRefObject<TextInput | null> = useRef(null);
  const calendarCellId = useSelector((state: any) => state.calendar.selectedCalendarCellId);
  const isCalendarInitialized = useSelector((state: any) => state.calendar.isInitialized);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('isCalendarInitialized: ', isCalendarInitialized);
    if (isCalendarInitialized === false) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
      return;
    }
    const headerText = getNoteHeaderText(calendarCellId);
    setDateText(`${headerText.date}（${headerText.dayOfTheWeek}）`);
  }, []);

  useEffect(() => {
    (async () => {
      if (textInputRef) {
        textInputRef?.current?.focus();
      }
      let note: NoteData | null = null;
      try {
        const jsonValue = await AsyncStorage.getItem(calendarCellId);
        note = jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }

      let labels: Label[] = [];
      try {
        const storagekeys = await AsyncStorage.getAllKeys();
        const labelKeys = _.filter(storagekeys, (storageKey) => {
          return storageKey.match(/^label_(.*)$/g);
        }) as string[];
        labels = await Promise.all(
          labelKeys.map(async (labelId) => {
            const jsonValue = await AsyncStorage.getItem(labelId);
            const label: Label = jsonValue != null ? JSON.parse(jsonValue) : null;
            return label;
          }),
        );
        localDispatch({
          type: 'changeLabels',
          payload: labels,
        });
      } catch (err) {
        console.log(err);
      }
      if (_.isNil(note)) {
        console.log('保存されたメモはありまえせんでした');
      } else {
        setFormikInitValues({
          memo: note.memo,
        });
        localDispatch({
          type: 'changeLabelId',
          payload: note?.labelId || '',
        });
        console.log('note.memo: ', note.memo);
      }

      setIsLoaded(true);
    })();
  }, []);

  const handlePressLabel = (labelId: string) => {
    localDispatch({
      type: 'changeLabelId',
      payload: labelId,
    });
  };

  const handleDone = useCallback(
    async (values: typeof formikInitValues) => {
      let note: NoteData | null = {
        emoji: [],
        memo: '',
        labelId: '',
      };

      const { memo } = values;

      try {
        const jsonValue = await AsyncStorage.getItem(calendarCellId);
        note = jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }

      try {
        const jsonValue = JSON.stringify({
          ...note,
          memo: _.isNil(memo) ? '' : memo,
          labelId: localState.labelId,
        });
        await AsyncStorage.setItem(calendarCellId, jsonValue);
        console.log(`${calendarCellId}: 保存完了`);
      } catch (error) {
        console.log(error);
      }
      // navigation.goBack();
      const newRefreshedDate = new Date().getTime();
      dispatch(changeCalendarRefreshedDate(newRefreshedDate));
      navigation.navigate('HomeScreen');
    },
    [localState],
  );

  return {
    isLoaded,
    dateText,
    formikSchema,
    formikInitValues,
    textInputRef,
    localState,
    handlePressLabel,
    handleDone,
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
