# eslint-plugin-deny-some-modules-full-import

不允许一些全量引入难以 tree-sharking 的包

## 安装

你要首先安装 [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

然后，安装 `eslint-plugin-deny-some-modules-full-import`:

```
$ npm install eslint-plugin-deny-some-modules-full-import --save-dev
```

## 使用

增加 `deny-some-modules-full-import` 进你的 `.eslintrc` 配置文件的 plugin 字段. 你可以省略 `eslint-plugin-` 前缀:

```json
{
  "plugins": ["deny-some-modules-full-import"]
}
```

然后在 rule 部分下配置要使用的 rule 。

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

## 示例

查看示例文件夹

[example](./examples)

## 支持规则

- deny-some-modules-full-import/deny-modules

## License

[MIT License](LICENSE)
