const filterObj = ['debug', 'development', 'dev'];

const defaultMatchModules = ['lodash', 'rxjs'];

function warn(...rest) {
  if (filterObj.indexOf(process.env.NODE_ENV) > -1) {
    return;
  }
  console.warn.apply(null, ['[warn]: ', ...rest]);
}

function str(s) {
  return String(s).replace(/^[a-z]/, v => v.toUpperCase());
}

function is(type) {
  return value =>
    Object.prototype.toString.call(value) === `[object ${str(type)}]`;
}
function isObject(obj) {
  return is('object')(obj);
}

function isArray(obj) {
  return is('array')(obj);
}

function isFunction(func) {
  return is('function')(func);
}

function getLocalNameMaps(node) {
  if (node.specifiers && node.specifiers.length > 0) {
    return node.specifiers.map(specifier => specifier.local.name);
  }

  return [];
}

function testPatternWithModuleName(name, matchModules) {
  let match = false;
  for (let item of matchModules) {
    if (item instanceof RegExp && item.test(name)) {
      match = true;
      break;
    }
    if (item === name) {
      match = true;
      break;
    }
  }
  return match;
}

function getLocalNamesString(specifiersNames) {
  return packageNameUse =>
    specifiersNames
      .map(item => `import ${item} from ${packageNameUse(item)};`)
      .join('\n');
}

function getPathRaw(node) {
  return node.source.raw;
}

function getOptions(context) {
  let options = {};
  if (!context.options || !isArray(context.options)) {
    return {
      options
    };
  }

  context.options.forEach(option => {
    if (isObject(option)) {
      options = option;
    }
  });
  return {
    options
  };
}

function defaultRenderReportText(name) {
  return `你不能直接引用模块: ${name}, 因为其应该未存在可直接解构，梳理优化的能力`;
}

module.exports = {
  name: 'deny-modules',
  meta: {
    type: 'problem',
    docs: {
      // description:
      recommended: 'error'
      // suggestion: true
    },
    fixable: 'code'
  },
  create(context) {
    const { options } = getOptions(context);
    let {
      matchModules = defaultMatchModules,
      customRenderPackageName = false,
      customRenderReportText = defaultRenderReportText
    } = options;
    if (typeof matchModules === 'string') {
      matchModules = [matchModules];
    }
    if (typeof matchModules.length === 'undefined') {
      warn('matchModules 应该为字符串或者数组');
      return {};
    }
    if (!isFunction(customRenderReportText)) {
      warn('customRenderReportText 应该为函数');
      return {};
    }
    function ImportDeclaration(path) {
      const name = path.source.value;
      if (testPatternWithModuleName(name, matchModules)) {
        context.report({
          node: path,
          message: customRenderReportText(name),
          data: {
            packageName: name
          },
          fix: function (fixer) {
            const packageName = name;
            for (let specifier of path.specifiers) {
              if (specifier.type === 'ImportDefaultSpecifier') {
                return;
              }
            }
            const specifiersNames = getLocalNameMaps(path);
            const packageNameUse = customRenderPackageName
              ? item => customRenderPackageName(packageName, item)
              : /^\'/.test(getPathRaw(path))
              ? item => `'${packageName}/${item}'`
              : item => `"${packageName}/${item}"`;
            const fixerReplaceText = getLocalNamesString(specifiersNames)(
              packageNameUse
            );
            return fixer.replaceText(path, fixerReplaceText);
          }
        });
      }
    }

    return { ImportDeclaration };
  }
};
