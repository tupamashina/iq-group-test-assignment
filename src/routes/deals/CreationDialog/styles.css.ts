import { globalStyle, style } from '@vanilla-extract/css';

import { textFieldContainerClass } from '~/components/TextField/styles.css';
import { themeVars } from '~/styles/theme.css';

const triggerClass = style({ marginTop: '4rem' });

const overlayClass = style({
  position: 'fixed',
  inset: 0,

  display: 'grid',
  placeItems: 'center',

  overflowY: 'auto',

  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

const contentClass = style({
  paddingBlock: '1.5rem 1.125rem',
  paddingInline: '1.5rem',

  backgroundColor: themeVars.colors.white,
  boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.25)',
});

const titleClass = style({
  marginBlockEnd: '2rem',
  fontSize: '2.25rem',
  lineHeight: '2.75rem',
});

const formClass = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: '1.75rem',
});

globalStyle(`${formClass} ${textFieldContainerClass}`, {
  gridColumn: '1 / -1',
});

export const dealsRouteCreationDialogStyles = {
  triggerClass,
  overlayClass,
  contentClass,
  titleClass,
  formClass,
} as const;
