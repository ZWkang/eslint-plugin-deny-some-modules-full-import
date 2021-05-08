module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 0,
    'deny-some-modules-full-import/deny-modules': [
      'error',
      {
        matchModules: ['lodash'],
        customRenderPackageName: (packageName, item) => {
          if (packageName === 'lodash') {
            return `'react/${item}'`;
          }
          return `'${packageName}/${item}/`;
        },
        customRenderReportText: null
      }
    ]
  },
  plugins: ['deny-some-modules-full-import']
};
