module.exports = {
  preset: 'ts-jest',            // ← compile TypeScript on the fly
  testEnvironment: 'node',      // ← for Node APIs
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx', 'json', 'node'
  ],
  testMatch: [
    '**/test/**/*.test.ts'
  ]
}