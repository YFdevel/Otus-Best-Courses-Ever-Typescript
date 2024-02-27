import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  coverageProvider:"v8",
  preset: "@shelf/jest-mongodb",
  moduleFileExtensions:["js","jsx","ts","tsx","json","node"],
  roots:["<rootDir>/"],
  testMatch:["**/tests/**/*.[jt]s?x","**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
  "^.+\\.(ts|tsx)$": "ts-jest"
},
};
export default config;