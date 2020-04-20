module.exports = {
  type: "react-component",
  npm: { esModules: true, umd: "AutocompleteReact" },
  karma: {
    browsers: ["Chrome"],
    testContext: "tests.webpack.js",
  },
};
