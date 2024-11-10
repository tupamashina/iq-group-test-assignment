import { useLayoutEffect, useRef } from 'react';

export function useMemoRef<T>(value: T) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  });

  return valueRef;
}
