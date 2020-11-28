import { StackScreenProps } from '@react-navigation/stack';
import { Calendar } from 'components/Calendar';
import { Note } from 'components/Note';
import { Text, View } from 'components/Themed';
import { Formik } from 'formik';
import * as React from 'react';
import { TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { TabOneParamList } from 'types';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

import { useLogic, useStyles } from './hooks';

type Props = StackScreenProps<TabOneParamList, 'MemoInputScreen'>;

export const MemoInputScreen = ({ navigation }: Props) => {
  const { textInputRef, formikInitValues, formikSchema, handleDone } = useLogic({
    navigation,
  });
  const styles = useStyles();
  return (
    <View style={styles.container}>
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
            <View style={[tailwind('w-full')]}>
              <View style={[tailwind('pt-1')]}>
                <View style={[tailwind('px-4')]}>
                  <View style={[tailwind('w-full')]}>
                    <TextInput
                      ref={textInputRef}
                      placeholder=""
                      style={[
                        tailwind('w-full border border-gray-300 p-8 rounded-md'),
                        {
                          height: responsiveScreenHeight(50),
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
          </>
        )}
      </Formik>
    </View>
  );
};
