import { StackScreenProps } from '@react-navigation/stack';
import { Calendar } from 'components/Calendar';
import { Note } from 'components/Note';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TabOneParamList } from 'types';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

type Props = StackScreenProps<TabOneParamList, 'MemoInputScreen'>;

export default function TabOneScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Calendar onPress={() => console.log('onPress')} />
      <Note
        onPress={() => {
          navigation.navigate('MemoInputScreen');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
