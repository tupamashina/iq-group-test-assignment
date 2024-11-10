import { style } from '@vanilla-extract/css';

import { themeVars } from '~/styles/theme.css';

const sectionClass = style({
  marginBlock: '2rem 2.25rem',
  paddingBlock: '1.75rem 1.25rem',
  paddingInline: '2.5rem',

  backgroundColor: themeVars.colors.white,
});

const headerClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBlockEnd: '0.875rem',
});

const headingClass = style({
  fontSize: '2.25rem',
  fontWeight: 400,
  lineHeight: '2.75rem',
});

const deleteBtnClass = style({
  cursor: 'pointer',

  backgroundColor: 'transparent',
  border: 'none',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
});

const formsContainerClass = style({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gridTemplateRows: 594,

  rowGap: '1.5rem',
  columnGap: '4rem',

  marginBlockStart: '4.5rem',
});

export const dealRouteStyles = {
  sectionClass,

  headerClass,
  headingClass,
  deleteBtnClass,

  formsContainerClass,
} as const;
