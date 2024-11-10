import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from '~/styles/theme.css';

const sectionClass = style({ paddingBlockEnd: '1.75rem' });
const navClass = style({ display: 'flex', paddingBlock: '2.5rem' });

const tableClass = style({
  display: 'block',

  backgroundColor: themeVars.colors.gray08,

  fontSize: '2.25rem',
  lineHeight: '2.75rem',
  textAlign: 'center',
});

const tableRowClass = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '8fr 35fr 35fr 22fr',
});

globalStyle(`${tableClass} :is(th, td)`, {
  paddingBlock: '1.25rem',
  fontWeight: 400,
});

const dealLinkClass = style({ position: 'absolute', inset: 0, fontSize: 0 });

export const dealsRouteStyles = {
  sectionClass,
  navClass,

  tableClass,
  tableRowClass,
  dealLinkClass,
} as const;
