import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from 'screens/HomeScreen';
import { MemoInputScreen } from 'screens/MemoInputScreen';

import { HomeParamList } from '../types';

const HomeStack = createStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{
          refreshedDate: new Date().getTime(),
        }}
        options={{
          headerTitle: 'メモカレンダー',
        }}
      />
      <HomeStack.Screen
        name="MemoInputScreen"
        component={MemoInputScreen}
        options={{
          headerTitle: 'メモ入力',
        }}
      />
    </HomeStack.Navigator>
  );
};
