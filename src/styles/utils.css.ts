import { style } from '@vanilla-extract/css';

export const contentsClass = style({ display: 'contents' });

export const srOnlyClass = style({
  position: 'absolute',

  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clipPath: 'rect(0 0 0 0)',

  borderWidth: 0,
  whiteSpace: 'nowrap',
});
