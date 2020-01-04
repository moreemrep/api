module.exports = {
  setupFiles: ['./jest.env.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts', './jest.global.ts'],
  verbose: true,
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    'src/graphql/**/*.ts'
  ],
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
