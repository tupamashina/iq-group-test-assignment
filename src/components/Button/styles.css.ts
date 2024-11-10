import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '~/styles/theme.css';

export const buttonRecipe = recipe({
  base: {
    display: 'block',

    paddingBlock: '0.75rem',
    paddingInline: '1.5rem',

    cursor: 'pointer',
    border: 'none',

    fontSize: '2.25rem',
    lineHeight: '2.75rem',
    textAlign: 'center',
    textDecoration: 'none',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: themeVars.colors.black,
        color: themeVars.colors.gray10,
      },

      secondary: {
        backgroundColor: themeVars.colors.gray07,
        color: themeVars.colors.black,
      },

      tertiary: {
        backgroundColor: themeVars.colors.white,
        color: themeVars.colors.black,
      },
    },
  },
});
