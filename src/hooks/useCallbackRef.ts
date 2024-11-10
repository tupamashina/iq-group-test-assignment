import { useRef } from 'react';

import { useMemoRef } from './useMemoRef';

export function useCallbackRef<A extends unknown[], R>(
  callback: (...args: A) => R,
): (...args: A) => R;

export function useCallbackRef<A extends unknown[], R>(
  callback: ((...args: A) => R) | undefined,
  // eslint-disable-next-line ts/no-invalid-void-type -- for the pretty type
): (...args: A) => void extends R ? R : R | undefined;

export function useCallbackRef<A extends unknown[], R>(
  callback: ((...args: A) => R) | undefined,
) {
  const callbackRef = useMemoRef(callback);
  return useRef((...args: A) => callbackRef.current?.(...args)).current;
}
