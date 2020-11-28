import { CalendarCell } from 'components/CalendarCell';
import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export const CalendarRow = ({ dateCells }: { dateCells: number[] }) => {
  const cells = dateCells.map((dateNumber: number, index: number) => {
    return <CalendarCell dateNumber={dateNumber} columnNumber={index} />;
  });
  return (
    <View
      style={[
        tailwind('flex flex-auto flex-row justify-between h-full content-between items-between'),
      ]}
    >
      {cells}
    </View>
  );
};
