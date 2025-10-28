module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)" 
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest" 
  }
};
