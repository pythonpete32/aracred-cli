module.exports = function () {
  return {
    files: [
      './*.js' 
    ],

    tests: [
      './*.spec.js' 
    ],

    env: {
      type: 'node'
    },

    testFramework: 'jest'

  };
};