module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    './jest.setup.js',
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))',
  ],
  collectCoverageFrom: [
    'src/features/**/{components,hooks,screens,store,utils}/**/*.{js,jsx,ts,tsx}',
    'src/shared/{components,utils}/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/**/types.ts',
    '!src/**/constants.ts',
    '!src/shared/test/**/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 78,
      statements: 78,
    },
    'src/**/utils/**': {
      branches: 95,
      functions: 100,
      lines: 98,
      statements: 98,
    },
    'src/**/hooks/**': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'src/**/components/**': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/**/store/**': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
