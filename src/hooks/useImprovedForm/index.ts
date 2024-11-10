import { valibotResolver } from '@hookform/resolvers/valibot';
import { useRef, type ChangeEvent } from 'react';
import {
  get,
  useForm,
  type FieldError,
  type FieldErrors,
  type Path,
} from 'react-hook-form';

import type {
  ImprovedFormFieldElement,
  ImprovedFormRegisterOptions,
  ImprovedFormRegisterReturn,
  ImprovedFormValues,
  UseImprovedFormProps,
  UseImprovedFormReturn,
} from './types';

const getError = <V extends ImprovedFormValues>(
  errors: FieldErrors<V>,
  path: Path<V>,
) => get(errors, path) as FieldError | undefined;

export function useImprovedForm<V extends ImprovedFormValues>({
  schema,
  ...props
}: UseImprovedFormProps<V>): UseImprovedFormReturn<V> {
  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: valibotResolver(schema, undefined, { raw: true }),
    ...props,
  });

  const originalRegister = useRef(form.register).current;

  // Implementing the "reward early, punish late" pattern
  // https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/#4-reward-early-punish-late
  const register = useRef(function register<
    N extends Path<V>,
    E extends ImprovedFormFieldElement,
  >(name: N, options?: ImprovedFormRegisterOptions<V, N, E>) {
    const onChange = async (event: ChangeEvent<E>) => {
      options?.onChange?.(event);
      const prevError = getError(form.formState.errors, name);

      if (prevError) {
        const { errors } = await form.control._executeSchema([name]);
        const nextError = getError(errors, name);

        if (!nextError) form.clearErrors(name);
        else form.setError(name, nextError);
      }
    };

    return originalRegister(name, {
      ...options,
      // eslint-disable-next-line ts/no-misused-promises -- don't worry, buddy
      onChange,
    }) as ImprovedFormRegisterReturn<N, E>;
  }).current;

  return Object.assign(form, { register }) as UseImprovedFormReturn<V>;
}
