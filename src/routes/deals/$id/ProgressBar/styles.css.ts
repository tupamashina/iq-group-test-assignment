import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { themeVars } from '~/styles/theme.css';

const progressBarLabelClass = style({
  marginBlockEnd: '0.75rem',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
});

const progressBarTrackClass = style({
  position: 'relative',

  height: '1.375rem',

  backgroundColor: themeVars.colors.gray04,
});

const progressBarRangeClass = style({ position: 'absolute', inset: 0 });

const progressBarValueTextClass = style({
  position: 'absolute',
  top: calc.add('100%', '0.25rem'),
  left: '50%',
  translate: '-50% 0',

  fontSize: '1.5rem',
  lineHeight: '1.875rem',
});

export const dealRouteProgressBarStyles = {
  progressBarLabelClass,
  progressBarTrackClass,
  progressBarRangeClass,
  progressBarValueTextClass,
} as const;
