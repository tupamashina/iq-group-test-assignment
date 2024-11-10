import { useRef, useState, type Dispatch } from 'react';

import { useCallbackRef } from './useCallbackRef';
import { useMemoRef } from './useMemoRef';

type ControllableStateUpdater<T> = (prevState: T | undefined) => T;
export type SetControllableStateAction<T> = T | ControllableStateUpdater<T>;

export function useControllableState<T>(
  controlledValue: T | undefined,
  uncontrolledDefaultValue: T | (() => T | undefined) | undefined,
  onChange: ((value: T) => void) | undefined,
): [T | undefined, Dispatch<SetControllableStateAction<T>>] {
  const [uncontrolledValueState, setUncontrolledValueState] = useState(
    uncontrolledDefaultValue,
  );

  const isControlled = useRef(controlledValue !== undefined).current;
  const currentValue = isControlled ? controlledValue : uncontrolledValueState;

  const onChangeRef = useCallbackRef(onChange);
  const currentValueRef = useMemoRef(currentValue);

  const setCurrentValue = useRef<Dispatch<SetControllableStateAction<T>>>(
    (action) => {
      const currentValue = currentValueRef.current;

      const newValue =
        typeof action === 'function' ?
          (action as ControllableStateUpdater<T>)(currentValue)
        : action;

      if (!Object.is(currentValue, newValue)) {
        onChangeRef(newValue);
        if (!isControlled) setUncontrolledValueState(newValue);
      }
    },
  ).current;

  return [currentValue, setCurrentValue];
}
