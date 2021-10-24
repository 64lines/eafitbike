exports.config = {

  specs: [
    './specs/**/*.feature'
  ],

  capabilities: {
    browserName: 'chrome' // You can use any browser you want.
  },

  framework: 'custom', //We need this line to use the cucumber framework

  frameworkPath: require.resolve('protractor-cucumber-framework'), // Here it is

  cucumberOpts: {
    require: './steps/**/*.steps.ts', // This is where we'll be writing our actual tests
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  }
};