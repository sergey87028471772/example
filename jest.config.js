module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/__tests__/**/*.ts"],
  moduleNameMapper: {
    "~0_app": "<rootDir>/src/0_app",
    "~1_endpoints": "<rootDir>/src/1_endpoints",
    "~2_adapters": "<rootDir>/src/2_adapters",
    "~3_domain": "<rootDir>/src/3_domain",
    "~4_lib": "<rootDir>/src/4_lib",
    "~5_infrastructure": "<rootDir>/src/5_infrastructure",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
