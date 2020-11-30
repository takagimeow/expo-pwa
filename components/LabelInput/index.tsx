import { Label } from 'constants/Calendar';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

export const LabelInput = ({
  labels,
  onPress,
}: {
  labels: Label[];
  onPress: (labelId: string) => void;
}) => {
  return (
    <View style={[tailwind('flex-row flex-wrap')]}>
      {labels.map((label) => {
        console.log(label.title);
        return (
          <TouchableOpacity
            key={label.id}
            style={[tailwind('px-1 py-1')]}
            onPress={() => onPress(label.id)}
          >
            <Text
              style={[
                tailwind('border px-4 py-2 rounded-lg self-center'),
                {
                  color: label.color,
                },
              ]}
            >
              {label.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
