import { CalendarCellData } from 'components/Calendar/redux';
import _ from 'lodash';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createCalendarCellId } from 'reducers/callbacks';
import tailwind from 'tailwind-rn';

import { useLogic } from './hooks';

export const CalendarCell = ({
  id,
  month,
  day,
  columnNumber,
  rowNumber,
  displayedMonth,
}: {
  id: string;
  month: number;
  day: number;
  columnNumber: number;
  rowNumber: number;
  displayedMonth: number;
}) => {
  const { note, selectedCalendarCellId, handlePress } = useLogic({ id });
  // 平日と休日で色分け
  /**
   * 平日
   */
  const tailwindContainerStyle = tailwind('flex flex-1 pl-2');
  let tailwindContainerBorderStyle = tailwind('border-b border-r border-gray-200');
  let tailwindDateNumberTextStyle = tailwind('text-sm');
  /**
   * 日曜
   */
  if (columnNumber === 0) {
    tailwindDateNumberTextStyle = tailwind('text-sm text-red-600');
  }
  /**
   * 土曜
   */
  if (columnNumber === 6) {
    tailwindContainerBorderStyle = tailwind('border-b border-gray-200');
    tailwindDateNumberTextStyle = tailwind('text-sm text-blue-600');
  }

  /**
   * 画面に表示されている月とは違う月の日付がセルに表示されている場合はグレーアウトする
   */
  if (displayedMonth !== month) {
    tailwindDateNumberTextStyle = tailwind('text-sm text-gray-500');
  }

  if (id === selectedCalendarCellId) {
    tailwindContainerBorderStyle = tailwind('border-blue-600 border-2');
  }

  if (id === createCalendarCellId(new Date())) {
    tailwindDateNumberTextStyle = tailwind('text-green-600 font-bold');
  }
  return (
    <View style={[tailwindContainerStyle, tailwindContainerBorderStyle]}>
      <TouchableOpacity style={[tailwind('flex flex-1')]} onPress={() => handlePress(id)}>
        <View style={[tailwind('flex flex-1 flex-row')]}>
          <Text style={[tailwindDateNumberTextStyle]}>{day}</Text>
          {_.isNil(note) ? null : <Text style={[tailwind('text-black')]}>・</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};
