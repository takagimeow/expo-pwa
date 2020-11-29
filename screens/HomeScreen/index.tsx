import { StackScreenProps } from '@react-navigation/stack';
import { Calendar } from 'components/Calendar';
// import EditScreenInfo from 'components/EditScreenInfo';
import { Note } from 'components/Note';
import { View } from 'components/Themed';
import React from 'react';
import { HomeParamList } from 'types';

import { useLogic, useStyles } from './hooks';

type Props = StackScreenProps<HomeParamList, 'HomeScreen'>;

export const HomeScreen = ({ navigation, route }: Props) => {
  const { calendarCellId, memo } = useLogic();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Calendar onPress={() => console.log('onPress')} />
      <Note
        calendarCellId={calendarCellId}
        memo={memo}
        onPress={() => {
          navigation.navigate('MemoInputScreen');
        }}
      />
    </View>
  );
};
