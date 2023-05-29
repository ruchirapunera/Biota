const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  
  fixturesFolder: "./cypress/fixtures",

  videosFolder: "./cypress/videos",
  screenshotsFolder: "./cypress/screenshots",
  video: true,
  videoUploadOnPasses: false,
  videoCompression: 32,
  videoUploadTimeout: 300000,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  waitForAnimations: true,
  animationDistanceThreshold: 5,
  animationDurationThreshold: 50,

    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.feature$/,
            use: [
              {
                loader: "cypress-cucumber-preprocessor/loader",
              },
            ],
          },
        ],
      },
    },

    e2e: {
      setupNodeEvents(on, config) {
        return require("./plugins/index.js")(on, config);
      },
      specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
      specPattern: ["**/*.feature"],
    }
  })

