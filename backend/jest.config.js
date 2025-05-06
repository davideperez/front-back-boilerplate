/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
      "^.+\.tsx?$": ["ts-jest",{}],
    },
    setupFilesAfterEnv: ['<rootDir>/src/configs/jest.setup.ts'],
    verbose: true, // Muestra más información en la consola al correr los tests
};


/* import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Usa ts-jest para compilar TypeScript
    testEnvironment: 'node', // Entorno simulado para Node.js (ideal para backends)
    testMatch: ['/tests//*.test.ts'], // Rutas donde buscar los tests
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
      },
      extensionsToTreatAsEsm: ['.ts'],
    // clearMocks: true, // Limpia los mocks entre cada test
    moduleFileExtensions: ['ts', 'js', 'json'], // Extensiones que Jest entiende
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    }, // Permite importar archivos .js como .ts
    // rootDir: '.', // Directorio raíz del proyecto
    // globals: {
    //     'ts-jest': {
    //         isolatedModules: true, // Compila sin type-checking completo (más rápido)
    //     },
    // },
};

export default config; */