import type { ChangeEvent, FocusEvent, RefCallback } from 'react';
import type {
  Path,
  RegisterOptions,
  UseFormProps,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';
import type { Except } from 'type-fest';
import type { BaseIssue, BaseSchema, BaseSchemaAsync } from 'valibot';

export type ImprovedFormValues = Record<string | number, unknown>;

export type ImprovedFormFieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

//* ================================= register =================================

export interface ImprovedFormRegisterOptions<
  V extends ImprovedFormValues,
  N extends Path<V>,
  E extends ImprovedFormFieldElement,
> extends Pick<
    RegisterOptions<V, N>,
    'deps' | 'disabled' | 'shouldUnregister' | 'value'
  > {
  onBlur?: (event: FocusEvent<E>) => void;
  onChange?: (event: ChangeEvent<E>) => void;
}

export interface ImprovedFormRegisterReturn<
  N extends Path<ImprovedFormValues>,
  E extends ImprovedFormFieldElement,
> extends Pick<UseFormRegisterReturn<N>, 'disabled' | 'name'> {
  ref: RefCallback<E>;
  onBlur: (event: FocusEvent<E>) => Promise<boolean | undefined>;
  onChange: (event: ChangeEvent<E>) => Promise<boolean | undefined>;
}

export type ImprovedFormRegister<V extends ImprovedFormValues> = <
  N extends Path<V>,
  E extends ImprovedFormFieldElement,
>(
  name: N,
  options?: ImprovedFormRegisterOptions<V, N, E>,
) => ImprovedFormRegisterReturn<N, E>;

//* ================================= useForm ==================================

export type ImprovedFormSchema<V extends ImprovedFormValues> =
  | BaseSchema<V, unknown, BaseIssue<unknown>>
  | BaseSchemaAsync<V, unknown, BaseIssue<unknown>>;

export interface UseImprovedFormProps<V extends ImprovedFormValues>
  extends Pick<
    UseFormProps<V>,
    | 'disabled'
    | 'shouldUnregister'
    | 'defaultValues'
    | 'values'
    | 'errors'
    | 'resetOptions'
    | 'shouldFocusError'
    | 'criteriaMode'
    | 'delayError'
  > {
  schema: ImprovedFormSchema<V>;
}

export interface UseImprovedFormReturn<V extends ImprovedFormValues>
  extends Except<UseFormReturn<V>, 'register'> {
  register: ImprovedFormRegister<V>;
}
