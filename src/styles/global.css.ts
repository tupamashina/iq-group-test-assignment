import { createVar, globalStyle } from '@vanilla-extract/css';

import { themeVars } from './theme.css';

globalStyle('*, *::before, *::after', { margin: 0, padding: 0 });

globalStyle(':root', {
  fontFamily: [
    "'Inter'",

    '-apple-system',
    'BlinkMacSystemFont',
    "'Segoe UI'",
    "'Oxygen'",
    "'Ubuntu'",
    "'Cantarell'",
    "'Fira Sans'",
    "'Droid Sans'",
    "'Helvetica Neue'",
    'sans-serif',

    "'Apple Color Emoji'",
    "'Segoe UI Emoji'",
    "'Segoe UI Symbol'",
    "'Noto Color Emoji'",
    'emoji',
  ].join(', '),

  fontSize: 16,
});

export const rootPaddingInlineVar = createVar();

globalStyle('body', {
  vars: { [rootPaddingInlineVar]: '2.375rem' },

  backgroundColor: themeVars.colors.gray06,
  color: themeVars.colors.black,
});

globalStyle('#__root__', { paddingInline: rootPaddingInlineVar });
