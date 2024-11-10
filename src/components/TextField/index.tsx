import { useMaskito } from '@maskito/react';
import { clsx } from 'clsx/lite';
import {
  useMemo,
  type FC,
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type PropsWithChildren,
  type Ref,
} from 'react';

import { useId } from '~/hooks/useId';
import { mergeEventHandlers } from '~/utils/mergeEventHandlers';
import { mergeRefs } from '~/utils/mergeRefs';
import * as styles from './styles.css';

import type { MaskitoMask, MaskitoOptions } from '@maskito/core';
import type { Except } from 'type-fest';

//* ================================== Types ===================================

type HTMLTextInputTypeAttribute = Extract<
  HTMLInputTypeAttribute,
  'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
>;

type HTMLInputAutoCapitalizeAttribute =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters';

type TextInputHTMLAttributes = Except<
  InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'checked'
  | 'children'
  | 'defaultChecked'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'min'
  | 'multiple'
  | 'src'
  | 'step'
  | 'width'
>;

export interface TextFieldProps extends TextInputHTMLAttributes {
  label: string;
  ref?: Ref<HTMLInputElement>;
  type?: HTMLTextInputTypeAttribute;
  mask?: MaskitoMask | MaskitoOptions;

  error?: unknown;
  autoCapitalize?: HTMLInputAutoCapitalizeAttribute;
}

//* ================================== Utils ===================================

// See: https://maskito.dev/supported-input-types
const MASKITO_SUPPORTED_INPUT_TYPES = [
  'password',
  'search',
  'tel',
  'text',
  'url',
] as const satisfies HTMLTextInputTypeAttribute[];

const getDefaultAutoComplete = (
  type: HTMLTextInputTypeAttribute,
): HTMLInputAutoCompleteAttribute | undefined => {
  if (type === 'email' || type === 'tel' || type === 'url') return type;
};

const getDefaultInputMode = (
  type: HTMLTextInputTypeAttribute,
): TextFieldProps['inputMode'] => {
  if (type === 'email' || type === 'search' || type === 'tel' || type === 'url')
    return type;

  return 'text';
};

//* ================================ Component =================================

export const TextField: FC<PropsWithChildren<TextFieldProps>> = ({
  ref,
  mask,
  label,
  type: typeProp = 'text',
  onInput,
  onChange,
  error,
  id: idProp,
  className,
  children,
  ...props
}) => {
  const maskOptions: MaskitoOptions | undefined = useMemo(() => {
    if (
      Array.isArray(mask) ||
      mask instanceof RegExp ||
      typeof mask === 'function'
    )
      return { mask };

    return mask;
  }, [mask]);

  const maskitoRef = useMaskito({ options: maskOptions });
  const inputRef = useMemo(() => mergeRefs(ref, maskitoRef), [maskitoRef, ref]);

  const inputType: HTMLTextInputTypeAttribute =
    !maskOptions || MASKITO_SUPPORTED_INPUT_TYPES.includes(typeProp) ?
      typeProp
    : 'text';

  const inputId = useId(idProp);

  // Masked input should use native onInput instead of React-specific onChange
  // See: https://maskito.dev/frameworks/react#controlled-input
  const handleInput = mergeEventHandlers([onInput, onChange], true);

  return (
    <div className={styles.textFieldContainerClass}>
      {children}

      <input
        id={inputId}
        ref={inputRef}
        type={inputType}
        onInput={handleInput}
        aria-invalid={!!error}
        inputMode={getDefaultInputMode(inputType)}
        autoComplete={getDefaultAutoComplete(inputType)}
        className={clsx(styles.textFieldInputClass, className)}
        {...props}
      />

      <label htmlFor={inputId} className={styles.textFieldLabelClass}>
        {label}
      </label>
    </div>
  );
};
