import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

import { CalendarCellData } from 'components/Calendar/redux';

export const CalendarCell = ({
  month,
  day,
  columnNumber,
  rowNumber,
  displayedMonth,
}: {
  month: number;
  day: number;
  columnNumber: number;
  rowNumber: number;
  displayedMonth: number;
}) => {
  // クリックされた日付の場所を特定するための変数
  const calculatedColumnNumber = (columnNumber + rowNumber * 7) * 1;
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
  return (
    <View style={[tailwindContainerStyle, tailwindContainerBorderStyle]}>
      <TouchableOpacity
        style={[tailwind('flex flex-1')]}
        onPress={() => console.log('押されたよ: ', calculatedColumnNumber)}
      >
        <View style={[tailwind('flex flex-1')]}>
          <Text style={[tailwindDateNumberTextStyle]}>{day}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
