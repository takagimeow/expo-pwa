/* eslint-disable global-require */
import { Link } from 'gatsby';
import React from 'react';
import { View, Text, useWindowDimensions, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const ListLink = (props: { to: string; children: string; textSize: string }) => (
  <View style={[tailwind('px-2')]}>
    <Link
      to={props.to}
      style={{
        borderColor: 'transparent',
        borderWidth: 0,
        textDecoration: 'none',
      }}
    >
      <Text style={[tailwind(props.textSize)]}>{props.children}</Text>
    </Link>
  </View>
);

export const Layout = ({ title, children }: { title: string; children: React.ReactElement }) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <View style={[tailwind('flex justify-center flex-col')]}>
      <View style={[tailwind('flex flex-row justify-between px-8 py-4 border border-gray-200')]}>
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <Text style={[tailwind('text-2xl font-bold')]}>{title}</Text>
        </Link>
        <View style={[tailwind('flex flex-1 flex-row justify-end')]}>
          <ListLink to="/contact/" textSize="text-2xl">
            Download
          </ListLink>
        </View>
      </View>
      <View
        style={[
          tailwind('w-full py-4'),
          {
            backgroundColor: '#e53e3e',
            height: responsiveScreenHeight(50),
          },
          windowWidth > 580 ? null : tailwind('px-4'),
        ]}
      >
        <Image
          style={[
            tailwind('w-full h-full rounded-lg'),
            {
              resizeMode: 'contain',
            },
          ]}
          source={require('../assets/images/top.png')}
        />
      </View>
      <View style={[tailwind('flex flex-wrap pb-32')]}>
        <View style={[tailwind('flex flex-1 self-center')]}>{children}</View>
      </View>
      <View
        style={[
          tailwind('w-full py-4'),
          {
            backgroundColor: '#e53e3e',
            height: responsiveScreenHeight(50),
          },
          windowWidth > 580 ? null : tailwind('px-4'),
        ]}
      >
        <Image
          style={[
            tailwind('w-full h-full rounded-lg'),
            {
              resizeMode: 'contain',
            },
          ]}
          source={require('../assets/images/top.png')}
        />
      </View>
      {/**
       * footer
       */}
      <View
        style={[
          {
            width: windowWidth,
          },
          tailwind('flex flex-wrap px-8 py-4 border border-gray-200'),
        ]}
      >
        <View
          style={[
            windowWidth > 580
              ? tailwind('flex flex-row flex-wrap justify-between self-center')
              : tailwind('flex flex-col justify-center self-center'),
          ]}
        >
          <ListLink to="/contact/" textSize="text-base">
            お問い合わせ
          </ListLink>
          <ListLink to="/contact/" textSize="text-base">
            運営会社
          </ListLink>
          <ListLink to="/contact/" textSize="text-base">
            利用規約
          </ListLink>
          <ListLink to="/contact/" textSize="text-base">
            個人情報の保護について
          </ListLink>
          <ListLink to="/contact/" textSize="text-base">
            アプリに関するFAQ
          </ListLink>
          <ListLink to="/contact/" textSize="text-base">
            お知らせ
          </ListLink>
        </View>
      </View>
    </View>
  );
};
