module.exports = {
  displayName: 'deso-protocol',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/deso-protocol',
  setupFilesAfterEnv: ['<rootDir>/src/lib/setup-jest.ts'],
};
