module.exports = {
  preset: 'jest-expo-enzyme',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
  ],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/globalMock.js'],
};
