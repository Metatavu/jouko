module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "identity-obj-proxy"
  },
  "transformIgnorePatterns": ['<rootDir>/node_modules/'],
  "resetMocks": false,
  "setupFiles": ["jest-localstorage-mock"]
};