import {
  Content,
  Icon,
  Item,
  ItemText,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';

import * as styles from './styles.css';

import type { FC, PropsWithChildren, ReactNode } from 'react';

export type SelectValue = string | number | boolean | null;

export interface SelectItem<V extends SelectValue = SelectValue> {
  value: V;
  label: ReactNode;
}

export interface SelectProps<V extends SelectValue = SelectValue> {
  label: string;
  items: readonly SelectItem<V>[];

  value?: V;
  defaultValue?: V;
  disabled?: boolean;
  placeholder?: ReactNode;
  onChange?: (value: V) => void;
}

export const Select = (<const V extends SelectValue = SelectValue>({
  items,
  value,
  defaultValue,
  label,
  onChange,
  disabled,
  placeholder,
  children,
}: PropsWithChildren<SelectProps<V>>) => {
  const stringifiedValue = value === undefined ? value : JSON.stringify(value);

  const stringifiedDefaultValue =
    defaultValue === undefined ? defaultValue : JSON.stringify(defaultValue);

  const stringifiedItems = items.map(({ value, label }) => ({
    label,
    value: JSON.stringify(value),
  }));

  const handleChange = (value: string) => onChange?.(JSON.parse(value) as V);

  return (
    <label className={styles.selectLabelClass}>
      {label}
      {children}

      <Root
        value={stringifiedValue}
        defaultValue={stringifiedDefaultValue}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <Trigger className={styles.selectTriggerClass}>
          <Value placeholder={placeholder} />
          <Icon className={styles.selectIconClass} />
        </Trigger>

        <Portal>
          <Content position="popper" className={styles.selectContentClass}>
            <Viewport className={styles.selectViewportClass}>
              {stringifiedItems.map(({ value, label }) => (
                <Item
                  key={value}
                  value={value}
                  className={styles.selectItemClass}
                >
                  <ItemText>{label}</ItemText>
                </Item>
              ))}
            </Viewport>
          </Content>
        </Portal>
      </Root>
    </label>
  );
}) satisfies FC<SelectProps>;
