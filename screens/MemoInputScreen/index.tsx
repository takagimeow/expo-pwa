import { StackScreenProps } from '@react-navigation/stack';
import { LabelInput } from 'components/LabelInput';
import { View } from 'components/Themed';
import { Formik } from 'formik';
import _ from 'lodash';
import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, Button, Text } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { timeConverter } from 'reducers/callbacks';
import tailwind from 'tailwind-rn';
import { HomeParamList } from 'types';

import { useLogic } from './hooks';

type Props = StackScreenProps<HomeParamList, 'MemoInputScreen'>;

export const MemoInputScreen = ({ navigation }: Props) => {
  const {
    isLoaded,
    dateText,
    textInputRef,
    formikInitValues,
    formikSchema,
    localState,
    handlePressLabel,
    handleDone,
  } = useLogic({
    navigation,
  });
  // const styles = useStyles();
  const { labels, labelId } = localState;
  const labelIndex =
    labelId === '' || _.isNil(labelId)
      ? -1
      : _.findIndex(labels, (label) => {
          if (label.id === labelId) {
            return true;
          }
          return false;
        });
  return (
    <KeyboardAvoidingView
      style={[
        {
          flex: 1,
        },
        tailwind('bg-white'),
      ]}
      behavior="padding"
    >
      <View style={[tailwind('flex-row justify-between py-4 px-2')]}>
        <Text style={[tailwind('font-bold text-sm')]}>{dateText}</Text>
      </View>
      {labelIndex >= 0 ? (
        <View style={[tailwind('flex-row justify-between py-4 px-4')]}>
          <Text
            style={[
              tailwind('font-bold text-sm'),
              {
                color: labels[labelIndex].color,
              },
            ]}
          >
            {labels[labelIndex].title}
          </Text>
          <Text style={[tailwind('font-bold text-sm text-gray-600')]}>
            {`${timeConverter(
              labels[labelIndex].start.hours,
              labels[labelIndex].start.minutes,
            )} ~ ${timeConverter(labels[labelIndex].end.hours, labels[labelIndex].end.minutes)}`}
          </Text>
        </View>
      ) : null}
      {isLoaded ? (
        <Formik
          initialValues={formikInitValues}
          onSubmit={handleDone}
          validationSchema={formikSchema}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }: any) => (
            <>
              <ScrollView style={[tailwind('w-full')]}>
                <View style={[tailwind('pt-1')]}>
                  <View style={[tailwind('px-4')]}>
                    <View style={[tailwind('w-full justify-between content-between')]}>
                      <View style={[tailwind('w-full')]}>
                        <TextInput
                          ref={textInputRef}
                          placeholder=""
                          style={[
                            tailwind('w-full border border-gray-300 p-2 rounded-md'),
                            {
                              height: responsiveScreenHeight(30),
                              borderColor: '#f7f7f7',
                            },
                          ]}
                          value={values.memo}
                          onChangeText={handleChange('memo')}
                          onBlur={() => setFieldTouched('memo')}
                          onSubmitEditing={() => handleSubmit()}
                          multiline
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[tailwind('pt-1')]}>
                  <View style={[tailwind('px-4')]}>
                    <LabelInput labels={localState.labels} onPress={handlePressLabel} />
                  </View>
                </View>
              </ScrollView>
              <View style={[tailwind('w-full px-4 pb-24')]}>
                <View style={[tailwind('w-full')]}>
                  <Button title="登録" color="#cc0033" onPress={handleSubmit} />
                </View>
              </View>
            </>
          )}
        </Formik>
      ) : null}
    </KeyboardAvoidingView>
  );
};
