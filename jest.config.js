export default {
    testMatch: ["**/__tests__/**/*.test.js", "**/__tests__/**/*.test.mjs"],
    collectCoverage: true,
    coverageDirectory: "./coverage",
    moduleFileExtensions: ["js", "mjs", "node", "json"],
    transform: {
      "^.+\\.m?js$": "babel-jest"
    },
    testEnvironment: "node",
};