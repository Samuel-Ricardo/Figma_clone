import { defineConfig } from 'cypress';
import { env } from 'process';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  videoCompression: true,
  screenshotOnRunFailure: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  downloadsFolder: 'cypress/downloads',

  e2e: {
    setupNodeEvents(on, config) {
      // TODO: implement node event listeners here
    },
    supportFile: false,
    baseUrl: env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    specPattern: [
      'cypress/E2E/**/*.{cy,spec}.{js,jsx,ts,tsx}',
      'cypress/integration/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    ],
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
