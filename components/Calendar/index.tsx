import { CalendarRow } from 'components/CalendarRow';
import React from 'react';
import { View, GestureResponderEvent } from 'react-native';
import tailwind from 'tailwind-rn';

import { useLogic } from './hooks';

export const Calendar = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent, index: number) => void | undefined;
}) => {
  const {
    state,
    // dayOfTheWeekList,
    // handlePressDate,
    // handlePressPreviousMonth,
    // handlePressNextMonth,
  } = useLogic({ onPress });
  const { monthName, dates, selectedDateIndex } = state;

  const elements = dates.map((datesRow) => {
    return <CalendarRow dateCells={datesRow} />;
  });
  return <View style={[tailwind('flex-1')]}>{elements}</View>;
};
