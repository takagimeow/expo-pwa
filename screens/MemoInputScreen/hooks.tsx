import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import _ from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { TabOneParamList } from 'types';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { NoteData } from 'components/Note';

type Props = StackScreenProps<TabOneParamList, 'MemoInputScreen'>;

export const useLogic = ({ navigation }: { navigation: Props['navigation'] }) => {
  const [formikSchema] = useState(
    yup.object().shape({
      memo: yup.string().min(1).required(),
    }),
  );
  const [formikInitValues] = useState({
    memo: '',
  });
  const textInputRef: React.MutableRefObject<TextInput | null> = useRef(null);
  const calendarCellId = useSelector((state: any) => state.calendar.selectedCalendarCellId);
  
  useEffect(() => {
    if (textInputRef) {
      textInputRef?.current?.focus();
    }
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
        navigation.goBack();
      }

      try {
        const jsonValue = JSON.stringify({
          ...note,
          memo,
        });
        await AsyncStorage.setItem(calendarCellId, jsonValue);
      } catch (error) {
        console.log(error);
      }
      navigation.goBack();
    }
  };

  return {
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
