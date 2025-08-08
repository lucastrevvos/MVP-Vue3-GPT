import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/_tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  // alias "@/*" no backend
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  silent: true,
};

export default config;
