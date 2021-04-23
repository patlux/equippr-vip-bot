module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', 'dist/'],
  moduleFileExtensions: ['ts', 'js', 'node'],
  transform: {
    '\\.ts$': 'esbuild-runner/jest',
  },
};
