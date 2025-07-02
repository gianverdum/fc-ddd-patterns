// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {}],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['/**/*.spec.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
};

export default config;
