module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+.(ts|tsx|js|jsx)$": "babel-jest",
  },
};
