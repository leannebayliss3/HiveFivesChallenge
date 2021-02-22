module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|js)",
        "**/?(*.)+(test).+(ts|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: 'node'
}