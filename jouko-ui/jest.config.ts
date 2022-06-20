import type { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testMatch: [
      '**/__tests__/**/*.+(ts|tsx|js)'
    ],
  };
};