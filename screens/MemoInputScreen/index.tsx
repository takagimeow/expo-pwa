import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'components/Themed';
import { Formik } from 'formik';
import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, Button, Text } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import tailwind from 'tailwind-rn';
import { HomeParamList } from 'types';

import { useLogic, useStyles } from './hooks';

type Props = StackScreenProps<HomeParamList, 'MemoInputScreen'>;

export const MemoInputScreen = ({ navigation }: Props) => {
  const { isLoaded, dateText, textInputRef, formikInitValues, formikSchema, handleDone } = useLogic(
    {
      navigation,
    },
  );
  // const styles = useStyles();
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <View style={[tailwind('flex-row justify-between py-4 px-2')]}>
        <Text style={[tailwind('font-bold text-sm')]}>{dateText}</Text>
      </View>
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
