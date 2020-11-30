import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import React from 'react';
import { View, ScrollView, Text, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import tailwind from 'tailwind-rn';

import { getNoteHeaderText } from './callbacks';

export interface NoteData {
  emoji: string[];
  labelId: string;
  memo: string;
}

export const NoteHeader = ({ calendarCellId }: { calendarCellId: string }) => {
  const headerText = getNoteHeaderText(calendarCellId);
  let dayOfTheWeekText = headerText.dayOfTheWeek;
  let tailwindDayOfTheWeekText = tailwind('text-black');
  if (headerText.dayOfTheWeek === '土') {
    tailwindDayOfTheWeekText = tailwind('text-blue-500');
  }
  if (headerText.dayOfTheWeek === '日') {
    tailwindDayOfTheWeekText = tailwind('text-red-500');
  }
  console.log(headerText);
  console.log('dayofTheweektext: ', dayOfTheWeekText);
  if (dayOfTheWeekText) {
    dayOfTheWeekText = `（${dayOfTheWeekText}）`;
  }

  return (
    <View style={[tailwind('flex-row content-between px-2 pt-2')]}>
      <Text style={[tailwind('text-black font-bold')]}>{headerText.date}</Text>
      <Text
        style={[tailwindDayOfTheWeekText, tailwind('ml-1 font-bold')]}
      >{`${dayOfTheWeekText}`}</Text>
    </View>
  );
};

export const Note = ({
  calendarCellId,
  memo,
  onPress,
}: {
  calendarCellId: string;
  memo: string;
  onPress: () => void | undefined;
}) => {
  return (
    <View
      style={[
        tailwind('w-full flex-1'),
        {
          height: responsiveHeight(60),
        },
      ]}
    >
      <NoteHeader calendarCellId={calendarCellId} />
      <View
        style={[
          tailwind('ml-2'),
          {
            flex: 1,
          },
        ]}
      >
        <ScrollView>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
            {_.isNil(memo) || memo === '' ? (
              <Text style={[tailwind('text-gray-400')]}>
                ここをタップするとメモを入力できます。
              </Text>
            ) : (
              <Text style={[tailwind('text-black')]}>{memo}</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
