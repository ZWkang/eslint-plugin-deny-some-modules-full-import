# eslint-plugin-deny-some-modules-full-import

do not allow some modules can not be easy to tree sharking

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-deny-some-modules-full-import`:

```
$ npm install eslint-plugin-deny-some-modules-full-import --save-dev
```

## Usage

Add `this` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["deny-some-modules-full-import"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "deny-some-modules-full-import/deny-modules": 2
  }
}

{
  "rules": {
    "deny-some-modules-full-import/deny-modules": [2, { "matchRules": "lodash" }]
  }
}
```

## options

- matchModules
  string / string[]

- customRenderPackageName(packageName, packageItem)

- customRenderReportText(packageName)

## Example

see examples folder

[example](./examples)

## Supported Rules

- deny-some-modules-full-import/deny-modules

## License

[MIT License](LICENSE)
