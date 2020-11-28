import { CalendarCellData } from 'components/Calendar/redux';
import { CalendarCell } from 'components/CalendarCell';
import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

export const CalendarRow = ({
  cellDataList,
  rowNumber,
  displayedMonth,
}: {
  cellDataList: CalendarCellData[];
  displayedMonth: number;
  rowNumber: number;
}) => {
  const cells = cellDataList.map((cellData: CalendarCellData, index: number) => {
    return (
      <CalendarCell
        key={`CalendarCell_${displayedMonth + index + rowNumber}`}
        {...cellData}
        rowNumber={rowNumber}
        columnNumber={index}
        displayedMonth={displayedMonth}
      />
    );
  });
  return (
    <View style={[tailwind('flex flex-auto flex-row justify-between h-full content-between')]}>
      {cells}
    </View>
  );
};
