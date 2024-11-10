import { style } from '@vanilla-extract/css';

const formClass = style({ display: 'grid', rowGap: '1.625rem' });

const toggleFieldBtnClass = style({
  position: 'absolute',
  top: '0.375rem',
  right: 0,

  cursor: 'pointer',

  backgroundColor: 'transparent',
  border: 'none',

  fontSize: '1rem',
  lineHeight: '1.25rem',
});

const formControlsContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gridRow: 2,
  gridColumn: '1 / -1',
});

export const dealRouteBasicInfoFormStyles = {
  formClass,
  toggleFieldBtnClass,
  formControlsContainer,
} as const;
