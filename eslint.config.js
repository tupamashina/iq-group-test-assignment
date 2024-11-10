// @ts-check
/// <reference types="./eslint-typegen.d.ts" />
/* eslint-disable import/newline-after-import -- conflicting rules */

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import reactPlugin from '@eslint-react/eslint-plugin';
import gitignorePlugin from 'eslint-config-flat-gitignore';
import { composer, mergeConfigs } from 'eslint-flat-config-utils';
// @ts-expect-error: missing types
import commentsPluginConfigs from 'eslint-plugin-eslint-comments/configs';
import importPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPluginRecommendedConfig from 'eslint-plugin-prettier/recommended';
// @ts-expect-error: missing types
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import typegen from 'eslint-typegen';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const flatCompat = new FlatCompat();
const configComposer = composer(gitignorePlugin({ root: true }));

//* ================================ JavaScript ================================

void configComposer.append(
  { ...eslintJs.configs.recommended, name: 'eslint/recommended' },
  {
    name: 'javascript/rules',
    plugins: { 'unused-imports': unusedImportsPlugin },

    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: { ecmaVersion: 'latest' },
      globals: { ...globals.browser, ...globals.es2025, ...globals.node },
    },

    rules: {
      'no-plusplus': 'error',

      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
        'TSEnumDeclaration[const=true]',
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
);

//* ================================ TypeScript ================================

void configComposer.append(
  // @ts-expect-error: incorrect types
  typescriptEslint.configs.strictTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
  {
    name: 'typescript-eslint/rules',

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      'ts/ban-ts-comment': 'warn',
      'ts/method-signature-style': ['error', 'property'],

      'ts/no-confusing-void-expression': [
        'warn',
        { ignoreArrowShorthand: true },
      ],

      'ts/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends', allowObjectTypes: 'never' },
      ],

      'ts/no-unused-vars': 'off',
      'ts/prefer-nullish-coalescing': 'off',
      'ts/restrict-template-expressions': ['error', { allowNumber: true }],
      'ts/switch-exhaustiveness-check': 'error',
    },
  },
);

//* ================================= Imports ==================================

const TYPESCRIPT_EXTENSIONS = ['.ts', '.cts', '.mts', '.tsx'];

const ALL_EXTENSIONS = [
  ...TYPESCRIPT_EXTENSIONS,
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
];

// @ts-expect-error: incorrect plugin types
void configComposer.append({
  name: 'import/rules',
  plugins: importPlugin.flatConfigs.recommended.plugins,

  settings: {
    'import-x/extensions': ALL_EXTENSIONS,
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import-x/parsers': { '@typescript-eslint/parser': TYPESCRIPT_EXTENSIONS },
    'import-x/resolver': 'oxc',
  },

  rules: {
    'import/first': 'warn',
    'import/newline-after-import': ['warn', { considerComments: true }],
    'import/no-anonymous-default-export': 'warn',
    'import/no-cycle': 'error',
    'import/no-default-export': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-default': 'warn',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',

    'import/order': [
      'warn',
      {
        distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: { order: 'asc', orderImportKind: 'asc' },

        groups: [
          ['builtin', 'external', 'internal'],
          ['index', 'sibling', 'parent'],
          ['type', 'unknown'],
        ],

        pathGroups: [
          { pattern: '~/**', group: 'parent', position: 'before' },
          { pattern: '../**', group: 'parent', position: 'before' },
          { pattern: './**', group: 'sibling', position: 'after' },
        ],
      },
    ],
  },
});

//* ================================== React ===================================

/** @type {ESLintConfig} */
const reactRefreshPluginRecommendedConfig = {
  // eslint-disable-next-line ts/no-unsafe-assignment -- missing types
  plugins: { 'react-refresh': reactRefreshPlugin },

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

const reactRecommendedConfig = mergeConfigs(
  // @ts-expect-error: incorrect types
  reactPlugin.configs['recommended-type-checked'],
  ...fixupConfigRules(flatCompat.extends('plugin:react-hooks/recommended')),
  reactRefreshPluginRecommendedConfig,
  { name: 'react/recommended' },
);

void configComposer.append(reactRecommendedConfig, {
  name: 'react/rules',

  rules: {
    'react/no-class-component': 'error',
    'react/no-missing-component-display-name': 'warn',
    'react/no-useless-fragment': 'error',
    'react/prefer-shorthand-boolean': 'warn',
    'react/prefer-shorthand-fragment': 'warn',

    'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
    'react-hooks-extra/no-direct-set-state-in-use-layout-effect': 'error',

    'react-naming-convention/use-state': 'warn',
  },
});

//* ================================= JSX a11y =================================

void configComposer.append(jsxA11yPlugin.flatConfigs.recommended, {
  name: 'jsx-a11y/rules',

  rules: {
    'jsx-a11y/no-redundant-roles': ['warn', { ol: ['list'], ul: ['list'] }],
  },
});

//* ================================= Unicorn ==================================

void configComposer.append(
  { ...unicornPlugin.configs['flat/recommended'], name: 'unicorn/recommended' },
  {
    name: 'unicorn/rules',

    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/switch-case-braces': ['warn', 'avoid'],
    },
  },
);

//* ============================= ESLint comments ==============================

void configComposer.append({
  name: 'eslint-comments/rules',
  // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-member-access -- missing types
  plugins: commentsPluginConfigs.recommended.plugins,

  rules: {
    'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': 'warn',
    'eslint-comments/no-duplicate-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',

    'eslint-comments/no-use': [
      'warn',
      {
        allow: [
          'eslint-disable',
          'eslint-disable-line',
          'eslint-disable-next-line',
          'eslint-enable',
        ],
      },
    ],

    'eslint-comments/require-description': 'warn',
  },
});

//* ============================== Perfectionist ===============================

// @ts-expect-error: incorrect plugin types
void configComposer.append({
  name: 'perfectionist/rules',
  plugins: { perfectionist: perfectionistPlugin },

  rules: {
    'perfectionist/sort-named-exports': [
      'warn',
      { type: 'natural', groupKind: 'values-first' },
    ],

    'perfectionist/sort-named-imports': [
      'warn',
      { type: 'natural', groupKind: 'values-first' },
    ],
  },
});

//* ================================= Prettier =================================

void configComposer.append(
  { ...prettierPluginRecommendedConfig, name: 'prettier/recommended' },
  { name: 'prettier/rules', rules: { 'prettier/prettier': 'warn' } },
);

//* ================================== Utils ===================================

/** @typedef {import('eslint').Linter.Config} ESLintConfig */

/**
 * @param {ESLintConfig[] | Promise<ESLintConfig[]>} configs
 * @returns {Promise<ESLintConfig[]>}
 */
async function deduplicateESLintConfigs(configs) {
  /** @type {Set<string>} */ const configNames = new Set();
  /** @type {ESLintConfig[]} */ const deduplicatedConfigs = [];

  for (const config of await configs) {
    const { name } = config;

    if (!name || !configNames.has(name)) {
      if (name) configNames.add(name);
      deduplicatedConfigs.push(config);
    }
  }

  return deduplicatedConfigs;
}

/**
 * @param {ESLintConfig[] | Promise<ESLintConfig[]>} configs
 * @param {Record<string, string>} renames
 * @returns {Promise<ESLintConfig[]>}
 */
async function renameESLintConfigs(configs, renames) {
  const awaitedConfigs = await configs;
  const renamesEntries = Object.entries(renames);

  return awaitedConfigs.map((config) => {
    const { name } = config;
    if (!name) return config;

    const entry = renamesEntries.find(([prefix]) => name.startsWith(prefix));
    if (!entry) return config;

    return { ...config, name: name.replace(...entry) };
  });
}

//* ================================== Export ==================================

void configComposer.renamePlugins({
  'import-x': 'import',
  '@typescript-eslint': 'ts',

  '@eslint-react/dom': 'react-dom',
  '@eslint-react/debug': 'react-debug',
  '@eslint-react/web-api': 'react-web-api',
  '@eslint-react/hooks-extra': 'react-hooks-extra',
  '@eslint-react/naming-convention': 'react-naming-convention',
  '@eslint-react': 'react',

  '@eslint-community/eslint-comments': 'eslint-comments',
});

export default typegen(
  await renameESLintConfigs(await deduplicateESLintConfigs(configComposer), {
    'typescript-eslint': 'typescript',
  }),
);
