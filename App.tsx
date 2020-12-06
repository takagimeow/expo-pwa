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
