## Vue.js Contributing Guide 贡献指南

---

Hi! I'm really excited that you are interested in contributing to Vue.js. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

嗨！我真的很高兴你有兴趣为 Vue.js 做贡献。在提交稿件之前，请务必花点时间阅读以下指南:

- [Code of Conduct 行为守则](https://www.wolai.com/tYQ78LgXdt5NTknsQ5nXS2)

- Issue Reporting Guidelines 问题汇报指引

- Pull Request Guidelines 拉请求指南

- Development Setup 开发设置

- Scripts 脚本

- Project Structure 工程项目结构

- Contributing Tests 参与测试

- Financial Contribution 财政贡献

### Issue Reporting Guidelines 问题汇报指引

- Always use [https://new-issue.vuejs.org/](https://new-issue.vuejs.org/) to create new issues.

- 总是使用 [https://new-issue.vuejs.org/来创造新的问题。](https://new-issue.vuejs.org/来创造新的问题。)

## Pull Request Guidelines 拉请求指南

- Checkout a topic branch from a base branch, e.g. `master`, and merge back against that branch.

  从基本分支(例如 master)签出一个主题分支，然后合并回该分支。

- If adding a new feature:

  如果添加一个新功能:

  - Add accompanying test case. 添加附带的测试用例

  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

  - 提供一个令人信服的理由来添加这个特性。理想情况下，你应该首先打开一个建议问题，并在处理它之前得到它的批准。

- If fixing a bug:

  如果修复一个 bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.

  - 如果您正在解决一个特殊问题，在您的 PR 标题中添加(fix # xxxx [ ，# xxxx ])(# xxxx 是问题 id)以获得更好的发布日志，例如更新实体编码/解码(fix # 3899)。

  - Provide a detailed description of the bug in the PR. Live demo preferred.

  - 提供一个详细的说明，在公关的错误。现场演示优先。

  - Add appropriate test coverage if applicable. You can check the coverage of your code addition by running `npm test -- --coverage`.

  - 添加适当的测试覆盖范围(如果适用)。您可以通过运行 npm 测试——覆盖率来检查代码添加的覆盖率。

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

  当你在 PR-GitHub 上工作的时候，有多个小的提交是可以的——在合并之前，GitHub 可以自动压制它们。

- Make sure tests pass!

  确保测试通过！

- Commit messages must follow the [commit message convention](https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md) so that changelogs can be automatically generated. Commit messages are automatically validated before commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [yorkie](https://github.com/yyx990803/yorkie)).

  提交消息必须遵循提交消息约定，以便可以自动生成更改日志。提交消息在提交之前会自动进行验证(通过 yorkie 调用 Git Hooks)。

- No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [yorkie](https://github.com/yyx990803/yorkie)).

  只要安装了 dev dependencies，就无需担心代码风格——修改后的文件会自动使用 Prettier on commit 格式化(通过 yorkie 调用 Git Hooks)。

## Development Setup 开发设置

You will need [Node.js](https://nodejs.org/) **version 10+**, and [PNPM](https://pnpm.io/).

你需要 Node.js 10 + 版本和 PNPM。

We also recommend installing [ni](https://github.com/antfu/ni) to help switching between repos using different package managers. `ni` also provides the handy `nr` command which running npm scripts easier.

我们还建议安装 ni，以帮助使用不同的包管理器在仓库协议之间进行切换。Ni 还提供了方便的 nr 命令，可以更容易地运行 npm 脚本。

After cloning the repo, run:

clone 仓库后，运行:

$ pnpm i # install the dependencies of the project

A high level overview of tools used:

使用工具的高级概述:

- [TypeScript](https://www.typescriptlang.org/) as the development language

- ts 作为开发语言

- [Rollup](https://rollupjs.org/) for bundling

- rollup 打包

- [Jest](https://jestjs.io/) for unit testing

- 单元测试

- [Prettier](https://prettier.io/) for code formatting

- prettier 适合代码格式化

## Scripts 脚本

**The examples below will be using the ****`nr`**** command from the **[**ni**](https://github.com/antfu/ni)** package.** You can also use plain `npm run`, but you will need to pass all additional arguments after the command after an extra `--`. For example, `nr build runtime --all` is equivalent to `npm run build -- runtime --all`.

下面的示例将使用 ni 包中的 nr 命令。您也可以使用普通的 npm 运行，但是您需要在命令之后传递所有额外的参数。例如，nr build runtime -- all 等价于 npm run build -- runtime -- all。

### `nr build`

The `build` script builds all public packages (packages without `private: true` in their `package.json`).

构建脚本构建所有公共包(在 package.json 中不包含 private: true )。

Packages to build can be specified with fuzzy matching:

要构建的包可以通过模糊匹配来指定:



```JavaScript
# build runtime-core only

nr build runtime-core

# build all packages matching "runtime"

nr build runtime --all
```

#### Build Formats 构建格式

By default, each package will be built in multiple distribution formats as specified in the `buildOptions.formats` field in its `package.json`. These can be overwritten via the `-f` flag. The following formats are supported:

默认情况下，每个包将按照 package.json 中 buildops.formats 字段中指定的多种发布格式构建。可以通过-f 标志覆盖这些内容。支持以下格式:

- **`global`**

- **`esm-bundler`**

- **`esm-browser`**

- **`cjs`**

Additional formats that only apply to the main `vue` package:

仅适用于主 vue 包的其他格式:

- **`global-runtime`**

- **`esm-bundler-runtime`**

- **`esm-browser-runtime`**

More details about each of these formats can be found in the [`vue`](https://github.com/vuejs/vue-next/blob/master/packages/vue/README.md#which-dist-file-to-use)[ package README](https://github.com/vuejs/vue-next/blob/master/packages/vue/README.md#which-dist-file-to-use) and the [Rollup config file](https://github.com/vuejs/vue-next/blob/master/rollup.config.js).

在 vue 包 README 和 Rollup 配置文件中可以找到关于每种格式的更多详细信息。

For example, to build `runtime-core` with the global build only:

例如，只使用全局构建来构建 runtime-core:

```JavaScript
nr build runtime-core -f global
```

Multiple formats can be specified as a comma-separated list:

多种格式可以指定为以逗号分隔的列表:

```JavaScript
nr build runtime-core -f esm-browser,cjs
```

#### Build with Source Maps 使用Source Map进行构建

Use the `--sourcemap` or `-s` flag to build with source maps. Note this will make the build much slower.

使用 -- sourcemap 或-s 标志来构建源地图。

#### Build with Type Declarations 使用类型声明进行构建

The `--types` or `-t` flag will generate type declarations during the build and in addition:

-- types 或-t 标志将在构建期间生成类型声明，此外:

- Roll the declarations into a single `.d.ts` file for each package;

- 将声明滚动到每个包的单个.d.ts 文件中;

- Generate an API report in `<projectRoot>/temp/<packageName>.api.md`. This report contains potential warnings emitted by [api-extractor](https://api-extractor.com/).

- 在 < projectroot >/temp/< packagename > . [API.md](http://API.md) 中生成一个 API 报告。

- Generate an API model json in `<projectRoot>/temp/<packageName>.api.json`. This file can be used to generate a Markdown version of the exported APIs.

- 在 < projectroot >/temp/< packagename > 中生成一个 API 模型 json。Api.json.此文件可用于生成导出 api 的 Markdown 版本。

### `nr dev`

The `dev` script bundles a target package (default: `vue`) in a specified format (default: `global`) in dev mode and watches for changes. This is useful when you want to load up a build in an HTML page for quick debugging:

Dev 脚本以指定的格式(默认: global)在 dev 模式下捆绑一个目标包(默认: vue) ，并监视更改。当你想在 HTML 页面中加载一个构建以便快速调试时，这是非常有用的:

```JavaScript
$ nr dev

> rollup v1.19.4
> bundles packages/vue/src/index.ts → packages/vue/dist/vue.global.js...
```

- The `dev` script also supports fuzzy match for the target package, but will only match the first package matched.

  Dev 脚本也支持目标包的模糊匹配，但是只匹配第一个匹配的包。

- The `dev` script supports specifying build format via the `-f` flag just like the `build` script.

  Dev 脚本支持通过-f 标志指定构建格式，就像构建脚本一样。

- The `dev` script also supports the `-s` flag for generating source maps, but it will make rebuilds slower.

  Dev 脚本也支持-s 标志来生成source maps，但是它会使重建变慢。

### `nr dev-compiler`

The `dev-compiler` script builds, watches and serves the [Template Explorer](https://github.com/vuejs/vue-next/tree/master/packages/template-explorer) at `http://localhost:5000`. This is extremely useful when working on the compiler.

开发编译器的脚本构建，监视和服务模板浏览器在 [http://localhost:5000](http://localhost:5000)。这在处理编译器时非常有用。

### `nr test`

The `test` script simply calls the `jest` binary, so all [Jest CLI Options](https://jestjs.io/docs/en/cli) can be used. Some examples:

测试脚本只是简单地调用 Jest 二进制文件，因此可以使用所有 Jest CLI 选项:

```JavaScript
# run all tests
$ nr test

# run all tests under the runtime-core package
$ nr test runtime-core

# run tests in a specific file
$ nr test fileName -t 'test name'
```

# run a specific test in a specific file



The default `test` script includes the `--runInBand` jest flag to improve test stability, especially for the CSS transition related tests. When you are testing specific test specs, you can also run `npx jest` with flags directly to speed up tests (jest runs them in parallel by default).

默认的测试脚本包括 -- runInBand jest 标志，以提高测试的稳定性，特别是对于 CSS 转换相关的测试。当您测试特定的测试规范时，您还可以使用标志直接运行 npx jest 来加速测试(jest 默认情况下并行运行它们)。

## Project Structure 工程项目结构

This repository employs a [monorepo](https://en.wikipedia.org/wiki/Monorepo) setup which hosts a number of associated packages under the `packages` directory:

这个存储库使用了 monorepo 设置，它在 packages 目录下托管了许多相关的包:

- `reactivity`: The reactivity system. It can be used standalone as a framework-agnostic package.

  响应式: 响应式系统。它可以独立使用，作为一个框架不可知的包。

- `runtime-core`: The platform-agnostic runtime core. Includes code for the virtual dom renderer, component implementation and JavaScript APIs. Higher-order runtimes (i.e. custom renderers) targeting specific platforms can be created using this package.

  Runtime-core: 与平台无关的运行时核心。包括虚拟 dom 渲染器、组件实现和 JavaScript api 的代码。可以使用此包创建针对特定平台的高阶运行时(即自定义渲染器)。

- `runtime-dom`: The runtime targeting the browser. Includes handling of native DOM API, attributes, properties, event handlers etc.

  运行时: 以浏览器为目标的运行时。包括处理本机 DOM API、属性、属性、事件处理程序等。

- `runtime-test`: The lightweight runtime for testing. Can be used in any JavaScript environment since it "renders" a tree of plain JavaScript objects. The tree can be used to assert correct render output. Also provides utilities for serializing the tree, triggering events, and recording actual node operations performed during an update.

  Runtime-test: 用于测试的轻量级运行时。可以在任何 JavaScript 环境中使用，因为它会“呈现”一个纯 JavaScript 对象树。该树可用于断言正确的渲染输出。还提供了用于序列化树、触发事件和记录在更新期间执行的实际节点操作的实用工具。

- `server-renderer`: Package for server-side rendering.

  Server-renderer: 用于服务器端呈现的包。

- `compiler-core`: The platform-agnostic compiler core. Includes the extensible base of the compiler and all platform-agnostic plugins.

  编译器核心: 与平台无关的编译器核心。包括可扩展的编译器基础和所有与平台无关的插件。

- `compiler-dom`: Compiler with additional plugins specifically targeting the browser.

  Compiler-dom: 带有专门针对浏览器的附加插件的编译器。

- `compiler-ssr`: Compiler that produces render functions optimized for server-side rendering.

  Compiler-ssr: 生成为服务器端呈现而优化的呈现函数的编译器。

- `template-explorer`: A development tool for debugging compiler output. You can run `nr dev template-explorer` and open its `index.html` to get a repl of template compilation based on current source code.

  Template-explorer: 用于调试编译器输出的开发工具。您可以运行 nr dev template-explorer 并打开其索引.html，以获得基于当前源代码的模板编译的代码。

  A [live version](https://vue-next-template-explorer.netlify.com/) of the template explorer is also available, which can be used for providing reproductions for compiler bugs. You can also pick the deployment for a specific commit from the [deploy logs](https://app.netlify.com/sites/vue-next-template-explorer/deploys).

  还提供了模板浏览器的实时版本，可用于为编译器错误提供复制。您还可以从部署日志中选择特定提交的部署。

- `shared`: Internal utilities shared across multiple packages (especially environment-agnostic utils used by both runtime and compiler packages).

  Shared: 跨多个包共享的内部实用程序(特别是运行时和编译器包使用的与环境无关的实用程序)。

- `vue`: The public facing "full build" which includes both the runtime AND the compiler.

  Vue: 面向公众的“完整版”，包括运行时和编译器。

### Importing Packages 导入包

The packages can import each other directly using their package names. Note that when importing a package, the name listed in its `package.json` should be used. Most of the time the `@vue/` prefix is needed:

这些包可以使用它们的包名称直接相互导入。请注意，在导入包时，应该使用其 package.json 中列出的名称。大多数时候需要@vue/前缀:

```JavaScript
import { h } from '@vue/runtime-core'
```

This is made possible via several configurations:

这可以通过几种配置来实现:

- For TypeScript, `compilerOptions.paths` in `tsconfig.json`

- 对于 TypeScript，在 tsconfig.json `compilerOptions.paths`

- For Jest, `moduleNameMapper` in `jest.config.js`

- 对于 Jest，可以在 Jest.config.js 中使用 modulemenemapper

- For plain Node.js, they are linked using [PNPM Workspaces](https://pnpm.io/workspaces).

- 对于普通的 Node.js，它们使用 PNPM 工作区进行链接。

### Package Dependencies 包依赖

```JavaScript
                                    +---------------------+
                                    |                     |
                                    |  @vue/compiler-sfc  |
                                    |                     |
                                    +-----+--------+------+
                                          |        |
                                          v        v
                      +---------------------+    +----------------------+
                      |                     |    |                      |
        +------------>|  @vue/compiler-dom  +--->|  @vue/compiler-core  |
        |             |                     |    |                      |
   +----+----+        +---------------------+    +----------------------+
   |         |
   |   vue   |
   |         |
   +----+----+        +---------------------+    +----------------------+    +-------------------+
        |             |                     |    |                      |    |                   |
        +------------>|  @vue/runtime-dom   +--->|  @vue/runtime-core   +--->|  @vue/reactivity  |
                      |                     |    |                      |    |                   |
                      +---------------------+    +----------------------+    +-------------------+

```

There are some rules to follow when importing across package boundaries:

在跨包边界导入时需要遵循一些规则:

- Never use direct relative paths when importing items from another package - export it in the source package and import it at the package level.

  当从另一个包导入项时，不要使用直接相对路径——将其导出到源包中，然后在包级别导入。

- Compiler packages should not import items from the runtime, and vice versa. If something needs to be shared between the compiler-side and runtime-side, it should be extracted into `@vue/shared` instead.

  编译器包不应该从运行时导入项，反之亦然。如果需要在编译器端和运行时端共享某些内容，则应该将其提取到@vue/shared 中。

- If a package (A) has a non-type import, or re-exports a type from another package (B), then (B) should be listed as a dependency in (A)'s `package.json`. This is because the packages are externalized in the ESM-bundler/CJS builds and type declaration files, so the dependency packages must be actually installed as a dependency when consumed from package registries.

  如果一个包(a)有一个非类型导入，或者从另一个包(b)重新导出一个类型，那么(b)应该在(a)的 package.json 中作为依赖项列出。这是因为这些包在 esm bundler/CJS 构建和类型声明文件中被外部化了，所以当从包注册中心使用这些依赖包时，实际上这些依赖包必须作为一个依赖项安装。

## Contributing Tests 参与测试

Unit tests are collocated with the code being tested in each package, inside directories named `__tests__`. Consult the [Jest docs](https://jestjs.io/docs/en/using-matchers) and existing test cases for how to write new test specs. Here are some additional guidelines:

单元测试与每个包中正在测试的代码并置在名为 _ test__ 的目录中。请参考 Jest 文档和现有的测试用例，了解如何编写新的测试规范。以下是一些额外的指导原则:

- Use the minimal API needed for a test case. For example, if a test can be written without involving the reactivity system or a component, it should be written so. This limits the test's exposure to changes in unrelated parts and makes it more stable.

  使用测试用例所需的最小 API。例如，如果一个测试可以在不涉及反应性系统或组件的情况下编写，那么它就应该这样编写。这限制了测试对不相关部分的变化的暴露，使其更加稳定。

- If testing platform agnostic behavior or asserting low-level virtual DOM operations, use `@vue/runtime-test`.

  如果测试平台无关行为或断言低级虚拟 DOM 操作，请使用@vue/runtime-test。

- Only use platform-specific runtimes if the test is asserting platform-specific behavior.

  只有在测试断言平台特定的行为时，才使用平台特定的运行时。

Test coverage is continuously deployed at [https://vue-next-coverage.netlify.app/](https://vue-next-coverage.netlify.app/). PRs that improve test coverage are welcome, but in general the test coverage should be used as a guidance for finding API use cases that are not covered by tests. We don't recommend adding tests that only improve coverage but not actually test a meaning use case.

测试覆盖范围持续部署在 [https://vue-next-coverage.netlify.app/。提高测试覆盖率的](https://vue-next-coverage.netlify.app/。提高测试覆盖率的) PRs 是受欢迎的，但是一般来说，测试覆盖率应该作为找到测试未覆盖的 API 用例的指南。我们不建议添加仅仅提高覆盖率而不是真正测试有意义的用例的测试。

### Testing Type Definition Correctness 测试类型定义正确性

This project uses [tsd](https://github.com/SamVerschueren/tsd) to test the built definition files (`*.d.ts`).

这个项目使用 tsd 来测试构建的定义文件(* . d.ts)。

Type tests are located in the `test-dts` directory. To run the dts tests, run `nr test-dts`. Note that the type test requires all relevant `*.d.ts` files to be built first (and the script does it for you). Once the `d.ts` files are built and up-to-date, the tests can be re-run by simply running `nr test-dts`.

类型测试位于 test-dts 目录中。要运行 dts 测试，请运行 nr test-dts。注意，类型测试需要所有相关的 * 。首先构建 d.ts 文件(脚本为您完成)。一旦构建了 d.ts 文件并更新了它们，只需运行 nr test-dts 就可以重新运行测试。

## Financial Contribution 财政贡献

As a pure community-driven project without major corporate backing, we also welcome financial contributions via Patreon and OpenCollective.

作为一个纯粹的社区驱动的项目，没有大型企业的支持，我们也欢迎通过 Patreon 和 opencprec 提供财政捐助。

- [Become a backer or sponsor on Patreon成为 Patreon 的支持者或赞助商](https://www.patreon.com/evanyou)

- [Become a backer or sponsor on OpenCollective成为 opencollection 的支持者或赞助者](https://opencollective.com/vuejs)

### What's the difference between Patreon and OpenCollective funding? Patreon 和 opencinterpretive funding 的区别是什么？

Funds donated via Patreon go directly to support Evan You's full-time work on Vue.js. Funds donated via OpenCollective are managed with transparent expenses and will be used for compensating work and expenses for core team members or sponsoring community events. Your name/logo will receive proper recognition and exposure by donating on either platform.

通过 Patreon 捐赠的资金将直接用于支持 Evan You 在 Vue.js 上的全职工作。通过开放式计划捐赠的资金以透明的费用进行管理，将用于补偿核心团队成员的工作和费用或赞助社区活动。您的名字/标志将通过在任何一个平台上捐赠得到适当的认可和曝光。

## Credits 学分

Thank you to all the people who have already contributed to Vue.js!

感谢所有为 Vue.js 做出贡献的人们！













## 读书心得

---

我的心得。

