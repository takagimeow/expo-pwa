import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
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

  const tailwindContainerStyle = tailwind('flex flex-1 pl-2');
  let tailwindContainerBorderStyle = tailwind('border-b border-r border-gray-200');
  let tailwindDateNumberTextStyle = tailwind('text-sm');
  if (columnNumber === 0) {
    tailwindDateNumberTextStyle = tailwind('text-sm text-red-600');
  }
  if (columnNumber === 6) {
    tailwindContainerBorderStyle = tailwind('border-b border-gray-200');
    tailwindDateNumberTextStyle = tailwind('text-sm text-blue-600');
  }
  return (
    <View style={[tailwindContainerStyle, tailwindContainerBorderStyle]}>
      <TouchableOpacity
        style={[tailwind('flex flex-1')]}
        onPress={() => console.log('押されたよ: ', calculatedcolumnNumber)}
      >
        <View style={[tailwind('flex flex-1')]}>
          <Text style={[tailwindDateNumberTextStyle]}>{dateNumber}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
