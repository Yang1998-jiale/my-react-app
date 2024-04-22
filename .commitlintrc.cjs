const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''));

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '');

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
        'other',
      ],
    ],
  },
  prompt: {
    /** @use `yarn commit :f` */
    alias: {
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
      b: 'build: bump dependencies',
      c: 'chore: update config',
    },

    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    skipQuestions: ['scope', 'body', 'breaking', 'footer'],
    types: [
      { value: 'feat', name: '特性(feat):   🚀  新增功能', emoji: '🚀' },
      { value: 'fix', name: '修复(fix):   🧩  修复缺陷', emoji: '🧩' },
      { value: 'wip', name: '待续(wip):   🤣  功能开发中', emoji: '🤣' },
      {
        value: 'style',
        name: '格式(style):   🎨  代码格式（不影响功能，例如空格、分号等格式修正）',
        emoji: '🎨',
      },
      {
        value: 'refactor',
        name: '重构(refactor):   ♻️  代码重构（不包括 bug 修复、功能新增）',
        emoji: '♻️',
      },
      { value: 'perf', name: '性能(perf):   ⚡️  性能优化', emoji: '⚡️' },
      { value: 'test', name: '测试(test):   ✅  添加疏漏测试或已有测试改动', emoji: '✅' },
      {
        value: 'build',
        name: '构建(build):   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
        emoji: '📦️',
      },
      { value: 'ci', name: '集成(ci):   🎡  修改 CI 配置、脚本', emoji: '🎡' },
      { value: 'revert', name: '回退(revert):   ⏪️  回滚 commit', emoji: '⏪️' },
      { value: 'release', name: '发版(release):   🎉  加鸡腿', emoji: '🎉' },
      { value: 'docs', name: '文档(docs):   📚  文档变更', emoji: '📚' },
      {
        value: 'other',
        name: '其他(other):   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
        emoji: '🔨',
      },
    ],
    useEmoji: true,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultScope: scopeComplete,
    scopes: [...scopes, 'mock'],
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
  },
};
