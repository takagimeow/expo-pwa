import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/messaging';
import Constants from 'expo-constants';
import firebase from 'firebase/app';
import _ from 'lodash';
import React from 'react';

// パッケージ

// 定数

export const REGION = 'asia-northeast1';

const FireabaseContext = React.createContext<any>(undefined);
// const FireabaseContext = React.createContext<firebase.app.App | undefined | null>(undefined)

type Config = {
  apiKey: string | undefined;
  authDomain: string | undefined;
  databaseURL: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
};

let config: Config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

if (_.has(Constants.manifest, 'extra') && Constants.manifest.extra.development) {
  config = {
    apiKey: Constants.manifest.extra.dev.apiKey,
    authDomain: Constants.manifest.extra.dev.authDomain,
    databaseURL: Constants.manifest.extra.dev.baseUrl,
    projectId: Constants.manifest.extra.dev.projectId,
    storageBucket: Constants.manifest.extra.dev.storageBucket,
    messagingSenderId: Constants.manifest.extra.dev.messagingSenderId,
    appId: Constants.manifest.extra.dev.appId,
    measurementId: Constants.manifest.extra.dev.measurementId,
  };
}

if (_.has(Constants.manifest, 'extra') && Constants.manifest.extra.development === false) {
  config = {
    apiKey: Constants.manifest.extra.release.apiKey,
    authDomain: Constants.manifest.extra.release.authDomain,
    databaseURL: Constants.manifest.extra.release.baseUrl,
    projectId: Constants.manifest.extra.release.projectId,
    storageBucket: Constants.manifest.extra.release.storageBucket,
    messagingSenderId: Constants.manifest.extra.release.messagingSenderId,
    appId: Constants.manifest.extra.release.appId,
    measurementId: Constants.manifest.extra.release.measurementId,
  };
}
export const FirebaseProvider = ({ children }: any) => {
  try {
    const firebaseInstance =
      typeof window !== 'undefined' && !firebase.apps.length
        ? firebase.initializeApp(config)
        : firebase.app();
    return (
      <FireabaseContext.Provider value={firebaseInstance}>{children}</FireabaseContext.Provider>
    );
  } catch (error) {
    console.error('');
  }
  return <FireabaseContext.Provider value={null}>{children}</FireabaseContext.Provider>;
};

export const useFirebase = (): firebase.app.App | null => {
  const context = React.useContext(FireabaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  } else if (typeof window === 'undefined') {
    return null;
  }
  return context;
};

export const useAuth = () => {
  const context = React.useContext<firebase.app.App>(FireabaseContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  } else if (typeof window === 'undefined') {
    return null;
  }

  return context.auth();
};

export const useFireStore = () => {
  const context = React.useContext<firebase.app.App>(FireabaseContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  } else if (typeof window === 'undefined') {
    return null;
  }
  // エミュレーターに接続

  if (
    process.env.NODE_ENV === 'development' &&
    (process.env.REACT_APP_DEVELOPMENT as string) === 'true'
  ) {
    context.firestore().settings({
      host: 'http://localhost:8082',
      // ssl: false,
    });
  }
  return context.firestore();
};
