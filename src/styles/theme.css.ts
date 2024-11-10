import { createGlobalTheme } from '@vanilla-extract/css';

export const themeVars = createGlobalTheme(':root', {
  colors: {
    black: '#000',
    white: '#FFF',

    new: '#D29A00',
    inProgress: '#CACA00',
    almostDone: '#69D200',
    success: '#00C907',
    failure: '#ED0000',

    gray01: '#313131',
    gray02: '#b6b6b6',
    gray03: '#c2c2c2',
    gray04: '#c5c5c5',
    gray05: '#cac8c8',
    gray06: '#d9d9d9',
    gray07: '#e6e6e6',
    gray08: '#ebebeb',
    gray09: '#ededed',
    gray10: '#f2f2f2',
    gray11: '#f4f4f4',
  },
} as const);
