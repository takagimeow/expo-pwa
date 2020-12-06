# Expo PWA 

Expoを使ったPWAアプリの作りかたを紹介します。

## プロジェクトの準備

```bash
expo init プロジェクト名
cd プロジェクト名
```

## ブラウザでアプリを起動

```bash
expo start:web
```

## オフラインをサポートする

まずejectします。

```bash
expo customize:web
```

生成したいファイル名をラジオボタン形式で聞かれるので、**webpack.config.js** を選択します。
**webpack.config.js** ファイルがルートディレクトリに作成されますので編集します。

```js
// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Passing true will enable the default Workbox + Expo SW configuration.
      offline: true,
    },
    argv,
  );
  // Customize the config before returning it.
  return config;
};
```

> 参考にしたページ
>
> https://github.com/expo/fyi/blob/master/enabling-web-service-workers.md

## PWA としてアプリをビルドする

pwaに必要な設定をapp.jsonファイルに記述します。

```json
// app.json
{
  "expo": {
    ...
    "web": {
        "favicon": "./assets/images/favicon.png",
        "backgroundColor": "",
        "description": "",
        "dir": "",
        "display": "",
        "lang": "",
        "name": "",
        "orientation": "",
        "scope": "",
        "shortName": "",
        "startUrl": "",
        "themeColor": "",
        "crossorigin": "",
        "relatedApplications": "",
        "preferRelatedApplications": "",
        "barStyle": "",
        "splash": ""
    }
  }
}
```

> マニフェストファイルのそれぞれの項目についての解説
>
> https://developer.mozilla.org/ja/docs/Web/Manifest
> https://murashun.jp/blog/20171210-01.html

設定が終わったらアプリをビルドします。

```bash
expo build:web
``` 

ビルドが終わったら、プロダクションモードで実行します。

```bash
npx serve web-build
```

netlifyにてデプロイする場合はローカルパッケージに expo-cli が必要になりますので、インストールしておきます。

```bash
yarn add -D expo-cli
```
## アセット

アイコンは 512 * 512 の png画像を用意。
スプラッシュ画像は 1284 * 2778 の png画像を用意。
ファビコンは 48 * 48 の png 画像を用意。

## ESLintを導入

```bash
yarn add -D eslint-config-universe eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier
```

ルートディレクトリに **.eslintrc.js** ファイルと **.eslintignore** ファイルを作成する。

```js
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript/base',
    'universe/native',
    'prettier',
  ],
  globals: {
    fetch: false,
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['off', 'tab'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'all',
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-undef': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'import/prefer-default-export': 'off',
  },
};
```

```
// .eslintignore
.eslintrc.js
babel.config.js
```

package.jsonファイルにlintスクリプトを追加する。

```json
// package.json
{
  ...
  "scripts": {
    ...
		"lint": "npx eslint . --ext ts",
		"lint:fix": "npx eslint . --ext ts --ext tsx --fix",
    ...
	},
  ...
}
```

### prettierを設定する

**.prettierrc** ファイルをルートディレクトリに作成します。

```json
// .prettierrc
{
	"printWidth": 100,
	"singleQuote": true,
	"semi": true,
	"trailingComma": "all",
	"tabWidth": 2,
	"useTabs": false,
	"endOfLine": "auto"
}
```

## typescriptを設定する

絶対パスを導入します。

まず、**tsconfig.jsonファイル**を編集して、VSCode上で絶対パスでパッケージをインポートした際に出現するエラーを抑制します。

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "target": "ESNext",
    "jsx": "react-native",
    "lib": ["dom", "esnext"],
    "moduleResolution": "node",
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "strict": true,
    "baseUrl": "."
  }
}
```

次に **babel.config.js** ファイルを編集してビルド時の絶対パス解決エラーを解決させます。

```js
// babel.config.js
module.exports = function (api) {
	api.cache(true);
	return {
    presets: ["babel-preset-expo"],
    ...
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						components: "./components",
						screens: "./screens",
						hooks: "./hooks",
						modals: "./modals",
						services: "./services",
						constants: "./constants",
						navigation: "./navigation",
						actions: "./actions",
						reducers: "./reducers",
						types: "./types.tsx",
						classes: "./classes",
					},
				},
			],
    ],
    ...
	};
};
```

定義ファイルの存在しないパッケージをインストールして使用する際に出現する定義ファイルが見つかりませんエラーを抑制するために、**globa.d.ts** ファイルをルートディレクトリに作成します。

```ts
// global.d.ts
declare module '*.png';
declare module 'lunr-languages';
```

## jestを設定

**jest-expo-enzyme** パッケージをインストールします。

```bash
yarn add -D jest-expo-enzyme
```

**jest.config.js** ファイルを作成します。

```js
// jest.config.js
module.exports = {
  preset: 'jest-expo-enzyme',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
  ],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/globalMock.js'],
};
```

**__mocks__** ディレクトリをルートディレクトリに作成して、その中にglobalMock.jsファイルを作成します。

```js
// __mocks__/globalMock.js
jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
}));
```

## Firebase等を利用する際のAPIキーの管理

外部APIキーを使用する場合は、app.jsonにべた書きしても使えるには使えるのですが、gitなどで管理する際にapp.jsonファイルも一緒にリポジトリに追加するためgithubなどのリモートリポジトリにpushした際に誤って第三者からそれらの機密情報が閲覧できる状態になってしまいます。
なので、そういった情報はapp.jsonファイルが読み込まれた後に読み込まれるapp.config.jsファイルに記述し、.gitignoreに当ファイルを追加することで外部に漏れ出てしまうことを防ぎます。

```js
// app.config.js
export default ({ config }) => ({
  ...config,
  extra: {
    apiKey: '**',
    authDomain: '**.firebaseapp.com',
    baseUrl: 'https://***.firebaseio.com',
    projectId: '***',
    storageBucket: '***.appspot.com',
    messagingSenderId: '***',
    appId: '***',
    measurementId: '***',
    development: false,
  },
});
```

## プッシュ通知に対応させる

まず、サービスワーカーファイルを独自でカスタマイズさせるために、必要なファイルをイジェクトさせます。

* web/expo-service-worker.js
* web/register-service-worker.js

```bash
expo customize:web

# web/expo-service-worker.js をスペースキーで選択
# web/register-service-worker.js をスペースキーで選択
```

作成されたwebフォルダの中に、firebase-messaging-sw.jsファイルを作成する

```js
// web/firebase-messaging-sw.js
/* eslint-disable no-restricted-globals */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: '******',
  authDomain: '******',
  projectId: '************',
  storageBucket: '************.appspot.com',
  messagingSenderId: '******',
  appId: '******',
  measurementId: '******',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

/**
 * 通知メッセージはFirebase SDK でハンドリングしてくれるが、データメッセージはアプリ側で実装しないといけないので、そのための実装
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
*/
```

作成したサービスワーカーファイルをregister-service-worker.jsファイルで登録する

```js
// web/register-service-worker.js
/* eslint-env browser */

/**
 * scope を SW_PUBLIC_SCOPEに設定しているというのは、PWAがSW_PUBLIC_SCOPE内で有効になっているということであり、
 * そこがPWAのスコープなので、サービスワーカーのファイルもSW_PUBLIC_SCOPEのパス以降に存在することになる。
 * ただ、このアプリは最初からPWAを想定して作られているため、scopeはルートを表す'/'で、registerするjsファイルも'/' + ファイル名となる。
 * これで failed to register SW_PUBLIC_SCOPEうんたらかんたらエラーと、mimetype html ほにゃららエラーが発生しなくなる。
 */

if ('serviceWorker' in navigator && 'register' in navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/expo-service-worker.js', { scope: '/' })
      .then(function (info) {
        // console.info('Registered service-worker', info);
      })
      .catch(function (error) {
        console.info('Failed to register service-worker', error);
      });
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', {
        scope: '/',
      })
      .then(function (info) {
        // console.info('Registered service-worker', info);
      })
      .catch(function (error) {
        console.info('Failed to register service-worker', error);
      });
  });
}
```

ここまではバックグラウンドでの実装。次はアプリ画面起動中のハンドリングをApp.tsxファイルに実装していく。

```tsx
// App.tsx
import { StatusBar } from 'expo-status-bar';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { FirebaseProvider, useFirebase } from 'services/firebase';
import { configureStore } from 'store/configureStore';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const store = configureStore();

export const Main = () => {
  const colorScheme = useColorScheme();
  const firebase = useFirebase();
  const [pushToken, setPushToken] = useState('');

  useEffect(() => {
    if (_.isNil(firebase)) {
      return () => {};
    }
    (async () => {
      try {
        const messaging = firebase.messaging();
        const currentToken = await messaging.getToken();
        if (_.isNil(currentToken) || currentToken === '') {
          console.log('No Token available');
          return;
        }
        console.log('FCM token> ', currentToken);
        setPushToken(currentToken);
        messaging.onMessage((payload) => {
          console.log('Message received. ', payload);
          const { title, ...options } = payload.notification;
          navigator.serviceWorker.register('web/firebase-messaging-sw.js');
          function showNotification() {
            Notification.requestPermission(function (result) {
              console.log('result: ', result);
              if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                  registration.showNotification(payload.notification.title, {
                    body: payload.notification.body,
                    tag: payload.notification.tag,
                  });
                });
              }
            });
          }
          showNotification();
        });
      } catch (err) {
        console.log('An error ocurred while retrieving token. ', err);
      }
    })();

    return () => {};
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <FirebaseProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </FirebaseProvider>
  );
}
```

これで実装は完成。