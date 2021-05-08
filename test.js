/**
 * @fileoverview simple deny modules plugin
 * @author ZWkang
 */
'use strict';

var RuleTester = require('eslint').RuleTester;
var rule = require('./rules/deny-modules');
var options = { matchModules: 'lodash' };
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run('deny-modules', rule, {
  valid: [
    // either
    {
      code: "import name from 'name'",
      options: ['never']
    }

    // options is empty,
  ],

  invalid: [
    {
      code: "import lodash from 'lodash'",
      options: ['always', options],
      errors: [
        {
          message:
            '你不能直接引用模块: lodash, 因为其应该未存在可直接解构，梳理优化的能力',
          type: 'ImportDeclaration',
          nodeType: 'ImportDeclaration'
        }
      ]
    },
    {
      code: "import lock from 'lock';\nimport lodash from 'lodash';",
      options: [
        'always',
        {
          matchModules: ['lock', 'lodash']
        }
      ],
      errors: [
        {
          message:
            '你不能直接引用模块: lock, 因为其应该未存在可直接解构，梳理优化的能力',
          type: 'ImportDeclaration',
          nodeType: 'ImportDeclaration'
        },
        {
          message:
            '你不能直接引用模块: lodash, 因为其应该未存在可直接解构，梳理优化的能力',
          type: 'ImportDeclaration',
          nodeType: 'ImportDeclaration'
        }
      ]
    },
    {
      code: "import {get, post} from 'lodash'",
      options: ['always', { matchModules: 'lodash' }],
      errors: [
        {
          message:
            '你不能直接引用模块: lodash, 因为其应该未存在可直接解构，梳理优化的能力',
          type: 'ImportDeclaration',
          nodeType: 'ImportDeclaration'
        }
      ]
    },
    {
      code: "import {get, post} from 'lodash'",
      options: [
        'always',
        {
          matchModules: 'lodash',
          customRenderReportText: function (pkg) {
            return `custom render 测试一下啦 ${pkg}`;
          }
        }
      ],
      errors: [
        {
          message: 'custom render 测试一下啦 lodash',
          type: 'ImportDeclaration',
          nodeType: 'ImportDeclaration'
        }
      ]
    }
  ]
});
