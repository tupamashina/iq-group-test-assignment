import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx/lite';

import { mergeEventHandlers } from '~/utils/mergeEventHandlers';
import type { PropsWithAsChild } from '../types';
import * as styles from './styles.css';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ButtonHTMLAttributes, FC, Ref } from 'react';
import type { Except } from 'type-fest';

type Variants = Required<
  NonNullable<RecipeVariants<typeof styles.buttonRecipe>>
>;

export interface ButtonProps
  extends Variants,
    Except<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'> {
  ref?: Ref<HTMLButtonElement>;
  softDisabled?: boolean;
}

export const Button: FC<PropsWithAsChild<ButtonProps>> = ({
  asChild,

  softDisabled,
  onClickCapture,

  variant,
  className,
  ...props
}) => {
  const Component = asChild ? Slot : 'button';

  const handleClickCapture = mergeEventHandlers((event) => {
    if (softDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, onClickCapture);

  return (
    <Component
      type="button"
      aria-disabled={softDisabled}
      onClickCapture={handleClickCapture}
      className={clsx(styles.buttonRecipe({ variant }), className)}
      {...props}
    />
  );
};
