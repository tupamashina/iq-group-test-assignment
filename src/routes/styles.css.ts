import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { rootPaddingInlineVar } from '~/styles/global.css';
import { themeVars } from '~/styles/theme.css';

const headerClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginInline: calc.negate(rootPaddingInlineVar),
  paddingBlock: '1rem',
  paddingInline: rootPaddingInlineVar,

  backgroundColor: themeVars.colors.white,
});

const headingClass = style({
  fontSize: '2.25rem',
  fontWeight: 400,
  lineHeight: '2.75rem',
});

const navLinkClass = style({
  fontSize: '2.25rem',
  fontWeight: 400,
  color: 'inherit',
  lineHeight: '2.75rem',
  textDecoration: 'none',
});

export const indexRouteStyles = {
  headerClass,
  headingClass,
  navLinkClass,
} as const;
