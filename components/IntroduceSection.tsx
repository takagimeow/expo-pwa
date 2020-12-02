/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import tailwind from 'tailwind-rn';

export const IntroduceSection = ({
  headerText,
  miniHeaderText,
  paragraph,
  alignment,
  image,
  imageBackgroundColor,
}: {
  headerText: string;
  miniHeaderText: string;
  paragraph: string;
  alignment: 'LEFT' | 'RIGHT';
  image: any;
  imageBackgroundColor: string;
}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  console.log('windowWidth: ', windowWidth);

  if (windowWidth > 580) {
    return (
      <>
        <View style={[tailwind('border-b border-gray-400 pb-2')]}>
          <Text style={[tailwind('text-2xl font-bold')]}>{headerText}</Text>
        </View>
        <View style={[tailwind('flex flex-1 flex-row flex-wrap justify-between py-4 px-4')]}>
          {alignment === 'LEFT' ? (
            <>
              <View style={[tailwind('flex flex-1 flex-col'), tailwind('pr-16')]}>
                <View
                  style={[
                    tailwind('flex flex-1'),
                    {
                      backgroundColor: imageBackgroundColor,
                    },
                  ]}
                >
                  <Image
                    style={[
                      {
                        height: windowHeight * 0.3,
                        resizeMode: 'contain',
                      },
                    ]}
                    source={image}
                  />
                </View>
                <View style={[tailwind('pt-4')]}>
                  <Text style={[tailwind('text-lg')]}>{miniHeaderText}</Text>
                </View>
              </View>
              <View style={[tailwind('flex flex-col')]}>
                <Text style={[tailwind('text-base')]}>{paragraph}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={[tailwind('flex flex-col')]}>
                <Text style={[tailwind('text-base')]}>{paragraph}</Text>
              </View>
              <View style={[tailwind('flex flex-1 flex-col'), tailwind('pl-16')]}>
                <View style={[tailwind('flex flex-1'), { backgroundColor: imageBackgroundColor }]}>
                  <Image
                    style={[
                      {
                        height: windowHeight * 0.3,
                        resizeMode: 'contain',
                      },
                    ]}
                    source={image}
                  />
                </View>
                <View style={[tailwind('pt-4')]}>
                  <Text style={[tailwind('text-lg')]}>{miniHeaderText}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </>
    );
  }
  return (
    <>
      <View style={[tailwind('border-b border-gray-400 pb-2')]}>
        <Text style={[tailwind('text-2xl')]}>{headerText}</Text>
      </View>
      <View style={[tailwind('flex flex-1 flex-col justify-center py-4')]}>
        <>
          <View style={[tailwind('flex flex-1 flex-col')]}>
            <View
              style={[
                tailwind('flex flex-1'),
                {
                  backgroundColor: imageBackgroundColor,
                },
              ]}
            >
              <Image
                style={[
                  {
                    height: windowWidth,
                    resizeMode: 'contain',
                  },
                ]}
                source={image}
              />
            </View>
            <View style={[tailwind('pt-4')]}>
              <Text style={[tailwind('text-lg')]}>{miniHeaderText}</Text>
            </View>
          </View>
          <View style={[tailwind('flex flex-col')]}>
            <Text style={[tailwind('text-base')]}>{paragraph}</Text>
          </View>
        </>
      </View>
    </>
  );
};
