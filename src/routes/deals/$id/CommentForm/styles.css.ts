import { globalStyle, style } from '@vanilla-extract/css';

import {
  textFieldInputClass,
  textFieldLabelClass,
} from '~/components/TextField/styles.css';
import { themeVars } from '~/styles/theme.css';

const formContainerClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const formClass = style({
  paddingBlock: '0.75rem 1.5rem',
  paddingInline: '2rem',

  backgroundColor: themeVars.colors.gray06,
});

globalStyle(`${formClass} ${textFieldInputClass}`, {
  backgroundColor: themeVars.colors.white,
  color: themeVars.colors.black,
});

globalStyle(`${formClass} ${textFieldLabelClass}`, {
  textAlign: 'center',
});

const listClass = style({
  paddingBlock: '1.5rem',
  paddingInline: '2rem',
  overflowY: 'scroll',

  backgroundColor: themeVars.colors.gray06,
  listStyle: 'none',
});

const listItemClass = style({
  paddingBlock: '1.125rem',
  paddingInline: '1.5rem',

  backgroundColor: themeVars.colors.gray11,

  fontSize: '1.5rem',
  lineHeight: '1.875rem',

  selectors: { '& + &': { marginBlockStart: '0.375rem' } },
});

export const dealRouteCommentFormStyles = {
  formContainerClass,
  formClass,
  listClass,
  listItemClass,
} as const;
