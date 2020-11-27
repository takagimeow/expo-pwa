import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export const CalendarCell = ({
  dateNumber,
  columnNumber,
}: {
  dateNumber: number;
  columnNumber: number;
}) => {
  // クリックされた日付の場所を特定するための変数
  const calculatedcolumnNumber = columnNumber + 7 * 1;
  // 平日と休日で色分け
  let elementClassName = 'n-calendar-date-element';
  if (columnNumber === 0) {
    elementClassName = 'n-calendar-date-element-sun';
  } else if (columnNumber === 6) {
    elementClassName = 'n-calendar-date-element-sat';
  }

  return (
    <View style={[tailwind('')]}>
      <View>{dateNumber}</View>
    </View>
  );
};
