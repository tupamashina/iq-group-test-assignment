import {
  maskitoTransform,
  maskitoUpdateElement,
  type MaskitoPlugin,
} from '@maskito/core';
import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoDateOptionsGenerator,
  maskitoEventHandler,
  maskitoNumberOptionsGenerator,
  maskitoParseNumber,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import {
  getCountryCallingCode,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import metadata from 'libphonenumber-js/metadata.min';
import { useState, type FC, type MouseEventHandler } from 'react';
import { Controller, type SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  empty,
  nonEmpty,
  object,
  pipe,
  regex,
  string,
  union,
  type InferInput,
} from 'valibot';

import { Button } from '~/components/Button';
import { Select, type SelectItem } from '~/components/Select';
import { TextField } from '~/components/TextField';
import { phoneNumberCheck } from '~/guards/checks/phoneNumber';
import {
  CompletedDealStatus,
  completedDealStatusSchema,
  UncompletedDealStatus,
  uncompletedDealStatusSchema,
} from '~/guards/schemas/deal';
import { useAppDispatch, useAppSelector } from '~/hooks/store';
import { useId } from '~/hooks/useId';
import { useImprovedForm } from '~/hooks/useImprovedForm';
import { selectDealById, updateDealAction } from '~/store/slices/deals';
import { translateDealStatus } from '~/utils/translateDealStatus';
import { dealRouteBasicInfoFormStyles as styles } from './styles.css';

//* ================================== Masks ===================================

const createdAtFieldMaskOptions = {
  separator: '.',
  mode: 'dd/mm/yyyy',
} as const satisfies Parameters<typeof maskitoDateOptionsGenerator>[0];

const createdAtFieldMask = maskitoDateOptionsGenerator(
  createdAtFieldMaskOptions,
);

const budgetFieldMaskOptions = {
  min: 0,
  precision: 2,
  postfix: ' руб.',
  decimalSeparator: ',',
} as const satisfies Parameters<typeof maskitoNumberOptionsGenerator>[0];

const budgetFieldMask = maskitoNumberOptionsGenerator(budgetFieldMaskOptions);

(budgetFieldMask.plugins as MaskitoPlugin[]).push(
  maskitoCaretGuard((value) => [
    0,
    value.length - budgetFieldMaskOptions.postfix.length,
  ]),

  maskitoEventHandler('input', (input) => {
    if (input.value === budgetFieldMaskOptions.postfix)
      maskitoUpdateElement(input, '');
  }),
);

const phoneNumberFieldMaskOptions = {
  metadata,
  countryIsoCode: 'RU',
} as const satisfies Parameters<typeof maskitoPhoneOptionsGenerator>[0];

const phoneNumberFieldMask = maskitoPhoneOptionsGenerator(
  phoneNumberFieldMaskOptions,
);

const countryCallingCode = `+${getCountryCallingCode(
  phoneNumberFieldMaskOptions.countryIsoCode,
)} `;

(phoneNumberFieldMask.plugins as MaskitoPlugin[]).push(
  maskitoAddOnFocusPlugin(countryCallingCode),
  maskitoRemoveOnBlurPlugin(countryCallingCode),
);

//* ================================== Schema ==================================

const BUDGET_REGEXP = /^\d[\d\s]*(,\d{1,2})? руб.$/;

const CREATED_AT_REGEXP =
  /^(?:[12]\d|0[1-9]|3[01])\.(?:0[1-9]|1[0-2])\.\d{4}$/u;

const formSchema = object({
  fullName: string(),
  status: union([completedDealStatusSchema, uncompletedDealStatusSchema]),

  phoneNumber: union([
    pipe(string(), empty()),
    pipe(string(), nonEmpty(), phoneNumberCheck()),
  ]),

  budget: union([
    pipe(string(), empty()),
    pipe(string(), nonEmpty(), regex(BUDGET_REGEXP)),
  ]),

  createdAt: union([
    pipe(string(), empty()),
    pipe(string(), nonEmpty(), regex(CREATED_AT_REGEXP)),
  ]),
});

type FormValues = InferInput<typeof formSchema>;
type FieldName = keyof FormValues;

//* ================================ Component =================================

const INITIAL_DISABLED_FIELDS: Record<keyof FormValues, boolean> = {
  budget: true,
  status: true,
  fullName: true,
  createdAt: true,
  phoneNumber: true,
};

const STATUS_SELECT_ITEMS = [
  ...Object.values(UncompletedDealStatus).filter(
    (status) => typeof status === 'number',
  ),
  ...Object.values(CompletedDealStatus),
].map((status) => ({
  value: status,
  label: translateDealStatus(status),
})) satisfies SelectItem[];

export const DealRouteBasicInfoForm: FC = () => {
  const id = Number(useParams()['id']);

  const { budget, status, fullName, createdAt, phoneNumber } =
    // eslint-disable-next-line ts/no-non-null-assertion -- I don't know how to redirect to 404 from the component...
    useAppSelector((state) => selectDealById(state, id))!;

  const {
    control,
    setFocus,
    resetField,
    handleSubmit,
    reset: _reset,
    register: _register,
    formState: { errors, isDirty },
  } = useImprovedForm({
    schema: formSchema,

    defaultValues: {
      status,
      fullName: fullName || '',
      budget: maskitoTransform(budget?.toString() || '', budgetFieldMask),
      phoneNumber: maskitoTransform(phoneNumber || '', phoneNumberFieldMask),

      createdAt: maskitoTransform(
        new Date(createdAt).toLocaleDateString('ru-RU'),
        createdAtFieldMask,
      ),
    },
  });

  const [disabledFields, setDisabledFields] = useState(INITIAL_DISABLED_FIELDS);

  const reset: typeof _reset = (...args) => {
    _reset(...args);
    setDisabledFields(INITIAL_DISABLED_FIELDS);
  };

  const toggleField = (name: FieldName) => {
    const disabled = disabledFields[name];
    setDisabledFields({ ...disabledFields, [name]: !disabled });

    if (!disabled) resetField(name);
    else requestIdleCallback(() => setFocus(name));
  };

  const register = ((name, options?) => {
    const disabled = disabledFields[name];

    return {
      disabled,
      ..._register(name, options),

      children: (
        <button
          type="button"
          onClick={() => toggleField(name)}
          className={styles.toggleFieldBtnClass}
        >
          {disabledFields[name] ? 'Изменить' : 'Отменить'}
        </button>
      ),
    };
  }) satisfies typeof _register;

  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler<FormValues> = (formValues) => {
    const fullName = formValues.fullName || null;

    const createdAt = new Date(
      formValues.createdAt.split('.').reverse().join('-'),
    ).getTime();

    let budget: number | null = maskitoParseNumber(
      formValues.budget,
      budgetFieldMaskOptions.decimalSeparator,
    );

    if (Number.isNaN(budget)) budget = null;

    const phoneNumber =
      !formValues.phoneNumber ? null : (
        parsePhoneNumberWithError(
          formValues.phoneNumber,
          phoneNumberFieldMaskOptions.countryIsoCode,
        ).number
      );

    reset(formValues);

    dispatch(
      updateDealAction({
        ...formValues,
        id,
        budget,
        fullName,
        createdAt,
        phoneNumber,
      }),
    );
  };

  const formId = useId();

  const handleResetBtnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <>
      <form
        // eslint-disable-next-line ts/no-misused-promises -- don't worry, buddy
        onSubmit={handleSubmit(submitHandler)}
        id={formId}
        className={styles.formClass}
      >
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              label="Статус"
              onChange={onChange}
              items={STATUS_SELECT_ITEMS}
              disabled={disabledFields.status}
            >
              <button
                type="button"
                onClick={() => toggleField('status')}
                className={styles.toggleFieldBtnClass}
              >
                {disabledFields.status ? 'Изменить' : 'Отменить'}
              </button>
            </Select>
          )}
        />

        <TextField
          type="tel"
          label="Номер телефона"
          autoComplete="mobile tel"
          mask={phoneNumberFieldMask}
          error={errors.phoneNumber}
          {...register('phoneNumber')}
        />

        <TextField
          label="Бюджет"
          autoComplete="transaction-amount"
          mask={budgetFieldMask}
          error={errors.budget}
          {...register('budget')}
        />

        <TextField
          label="ФИО"
          autoComplete="name"
          autoCapitalize="words"
          error={errors.fullName}
          {...register('fullName')}
        />

        <TextField
          label="Дата создания"
          mask={createdAtFieldMask}
          error={errors.createdAt}
          {...register('createdAt')}
        />
      </form>

      {isDirty && (
        <div className={styles.formControlsContainer}>
          <Button variant="primary" type="submit" form={formId}>
            Сохранить
          </Button>

          <Button
            variant="secondary"
            type="reset"
            form={formId}
            onClick={handleResetBtnClick}
          >
            Отменить
          </Button>
        </div>
      )}
    </>
  );
};
