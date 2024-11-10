import { style } from '@vanilla-extract/css';

import { themeVars } from '~/styles/theme.css';

export const selectLabelClass = style({
  position: 'relative',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
});

export const selectTriggerClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  marginBlockStart: '1.25rem',
  paddingBlock: '0.5625rem',
  paddingInline: '1rem',

  backgroundColor: themeVars.colors.gray03,
  border: 'none',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
  color: themeVars.colors.gray01,

  ':focus': { outline: 'none' },
  ':disabled': { backgroundColor: themeVars.colors.gray09 },
});

export const selectIconClass = style({
  fontSize: '1rem',

  selectors: {
    [`${selectTriggerClass}:disabled &`]: { display: 'none' },
    [`${selectTriggerClass}[data-state="open"] &`]: { rotate: '0.5turn' },
  },
});

export const selectContentClass = style({
  width: 'var(--radix-select-trigger-width)',
  maxHeight: 'min(10rem, var(--radix-select-content-available-height))',

  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
});

export const selectViewportClass = style({
  paddingBlock: '0.25rem',
  paddingInline: '0.375rem',

  backgroundColor: themeVars.colors.gray06,
});

export const selectItemClass = style({
  paddingBlock: '0.3125rem',
  paddingInline: '0.625rem',

  cursor: 'default',

  backgroundColor: themeVars.colors.gray02,

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
  color: themeVars.colors.black,

  ':hover': { backgroundColor: themeVars.colors.gray05 },
  selectors: { '&:is(:hover, :focus)': { outline: 'none' } },
});
