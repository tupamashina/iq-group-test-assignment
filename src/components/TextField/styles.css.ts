import { style } from '@vanilla-extract/css';

import { themeVars } from '~/styles/theme.css';

export const textFieldContainerClass = style({
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
});

export const textFieldInputClass = style({
  display: 'block',

  width: '100%',
  paddingBlock: '0.5625rem',
  paddingInline: '1rem',

  backgroundColor: themeVars.colors.gray03,
  border: 'none',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
  color: themeVars.colors.gray01,

  ':focus': { outline: 'none' },
  ':disabled': { backgroundColor: themeVars.colors.gray09 },
  '::placeholder': { opacity: 1, color: themeVars.colors.gray01 },
});

export const textFieldLabelClass = style({
  display: 'block',

  order: -1,
  marginBlockEnd: '1.25rem',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',

  selectors: {
    // Any value other than "" and "false" is considered true
    [`${textFieldInputClass}[aria-invalid]:not([aria-invalid=""], [aria-invalid="false"]) + &`]:
      { color: themeVars.colors.failure },
  },
});
