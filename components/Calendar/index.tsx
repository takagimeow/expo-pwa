import { Ionicons, Feather } from '@expo/vector-icons';
import { CalendarRow } from 'components/CalendarRow';
import React from 'react';
import { View, Text, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import tailwind from 'tailwind-rn';

import { useLogic } from './hooks';

export const Calendar = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent, index: number) => void | undefined;
}) => {
  const {
    state,
    dayOfTheWeekList,
    // handlePressDate,
    // handlePressPreviousMonth,
    handlePressLastMonth,
    handlePressNextMonth,
  } = useLogic({ onPress });
  const { year, month, monthName, dates, selectedDateIndex } = state;

  /**
   * 日から土までを上部に表示するためのコンポーネント
   */
  const headerElements = dayOfTheWeekList.map((dayOfTheWeek, index) => {
    let tailwindDayOfTheWeekTextStyle = tailwind('');
    if (index === 0) {
      tailwindDayOfTheWeekTextStyle = tailwind('text-red-600');
    }
    if (index === 6) {
      tailwindDayOfTheWeekTextStyle = tailwind('text-blue-600');
    }
    return (
      <View
        style={[tailwind('flex flex-1 h-8 justify-center items-center content-center')]}
        key={`${month * index}_dayOfTheWeek.toLowerCase()`}
      >
        <View style={[tailwind('self-center')]}>
          <Text style={[tailwind('text-sm'), tailwindDayOfTheWeekTextStyle]}>{dayOfTheWeek}</Text>
        </View>
      </View>
    );
  });
  const elements = dates.map((datesRow, index) => {
    return (
      <CalendarRow
        key={`CalendarRow_${month * index}`}
        cellDataList={datesRow}
        rowNumber={index}
        displayedMonth={month}
      />
    );
  });
  return (
    <View
      style={[
        tailwind('h-screen w-full'),
        {
          height: responsiveHeight(60),
        },
      ]}
    >
      <View style={[tailwind('flex-row items-between content-between justify-between px-2 pt-2')]}>
        <TouchableOpacity
          onPress={() => {
            handlePressLastMonth();
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Feather
              size={24}
              style={{ marginBottom: -3 }}
              name="chevron-left"
              // color={Colors.default.bodyBackground}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text>{`${year}年${month}月`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handlePressNextMonth();
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Feather
              size={24}
              style={{ marginBottom: -3 }}
              name="chevron-right"
              // color={Colors.default.bodyBackground}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[tailwind('w-full flex-row justify-between text-center')]}>
        {headerElements}
      </View>
      <View style={[tailwind('w-full h-auto flex-auto border-t border-gray-200')]}>{elements}</View>
    </View>
  );
};
