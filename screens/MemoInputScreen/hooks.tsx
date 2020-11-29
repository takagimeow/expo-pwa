import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { changeCalendarRefreshedDate } from 'actions/calendarActions';
import { NoteData } from 'components/Note';
import { getNoteHeaderText } from 'components/Note/callbacks';
import _ from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HomeParamList } from 'types';
import * as yup from 'yup';

type Props = StackScreenProps<HomeParamList, 'MemoInputScreen'>;

export const useLogic = ({ navigation }: { navigation: Props['navigation'] }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateText, setDateText] = useState('');
  const [formikSchema] = useState(
    yup.object().shape({
      memo: yup.string().min(1).required(),
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
      if (_.isNil(note)) {
        console.log('保存されたメモはありまえせんでした');
      } else {
        setFormikInitValues({
          memo: note.memo,
        });
        console.log('note.memo: ', note.memo);
      }

      setIsLoaded(true);
    })();
  }, []);

  const handleDone = async (values: typeof formikInitValues) => {
    if (_.has(values, 'memo')) {
      const { memo } = values;

      let note: NoteData | null = null;
      try {
        const jsonValue = await AsyncStorage.getItem(calendarCellId);
        note = jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }

      if (_.isNil(note)) {
        note = {
          emoji: [],
          memo: '',
          label: '',
        };
      }

      try {
        const jsonValue = JSON.stringify({
          ...note,
          memo,
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
    }
  };

  return {
    isLoaded,
    dateText,
    formikSchema,
    formikInitValues,
    textInputRef,
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
