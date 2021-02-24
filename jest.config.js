module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts)",
        "**/?(*.)+(test).+(ts)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: 'node'
}