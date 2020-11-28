import React, { useReducer } from 'react';
import { GestureResponderEvent } from 'react-native';

import { create5x7Cells } from './callbacks';
import { reducer } from './redux';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const useLogic = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent, index: number) => void | undefined;
}) => {
  const [state, localDispatch] = useReducer(reducer, {
    year: 2020,
    month: 1,
    monthName: 'January',
    dates: [],
    initialized: false,
    selectedDateIndex: 0,
  });

  const { year, month, monthName, initialized, selectedDateIndex } = state;

  React.useEffect(() => {
    if (initialized) {
      return () => {};
    }
    const d: Date = new Date();
    const thisYear = d.getFullYear();
    const thisMonth = d.getMonth() + 1;
    localDispatch({
      type: 'changeYear',
      payload: thisYear,
    });
    localDispatch({
      type: 'changeMonth',
      payload: thisMonth,
    });
    localDispatch({
      type: 'changeMonthName',
      payload: monthNames[thisMonth - 1],
    });
    localDispatch({
      type: 'changeDates',
      payload: create5x7Cells(thisYear, thisMonth),
    });
    localDispatch({
      type: 'changeInitialized',
      payload: true,
    });

    return () => {};
  }, [year, month]);

  /**
   * 次の月を表示するボタンをタップしたときのハンドラ
   */
  const handlePressLastMonth = React.useCallback(() => {
    console.log('month: ', month);
    if (month === 1) {
      localDispatch({
        type: 'changeYear',
        payload: year - 1,
      });
      localDispatch({
        type: 'changeMonth',
        payload: 12,
      });
      localDispatch({
        type: 'changeMonthName',
        payload: monthNames[11],
      });
      localDispatch({
        type: 'changeDates',
        payload: create5x7Cells(year - 1, 12),
      });
    } else {
      localDispatch({
        type: 'changeMonth',
        payload: month - 1,
      });
      localDispatch({
        type: 'changeMonthName',
        payload: monthNames[month - 2],
      });
      localDispatch({
        type: 'changeDates',
        payload: create5x7Cells(year, month - 1),
      });
    }
  }, [year, month, monthName]);

  /**
   * 前月を表示するボタンをタップしたときのハンドラ
   */
  const handlePressNextMonth = React.useCallback(() => {
    if (month === 12) {
      localDispatch({
        type: 'changeYear',
        payload: year + 1,
      });
      localDispatch({
        type: 'changeMonth',
        payload: 1,
      });
      localDispatch({
        type: 'changeMonthName',
        payload: monthNames[0],
      });
      localDispatch({
        type: 'changeDates',
        payload: create5x7Cells(year + 1, 1),
      });
    } else {
      localDispatch({
        type: 'changeMonth',
        payload: month + 1,
      });
      localDispatch({
        type: 'changeMonthName',
        payload: monthNames[month],
      });
      localDispatch({
        type: 'changeDates',
        payload: create5x7Cells(year, month + 1),
      });
    }
  }, [year, month]);

  /**
   * 日付のセルをタップしたときのハンドラ
   */
  const handlePressDate = React.useCallback(
    (event: GestureResponderEvent, index: number) => {
      localDispatch({
        type: 'changeSelectedDateIndex',
        payload: index,
      });

      if (onPress) {
        onPress(event, index);
      }
    },
    [selectedDateIndex],
  );

  return {
    state,
    // 関数
    handlePressDate,
    handlePressLastMonth,
    handlePressNextMonth,
  };
};
