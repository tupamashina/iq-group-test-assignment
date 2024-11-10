import type { Ref, RefCallback } from 'react';

export function mergeRefs<T>(...refs: Partial<Ref<T>[]>): RefCallback<T> {
  return (instance) => {
    const cleanupFuncs = refs.map((ref) => {
      if (typeof ref === 'function') return ref(instance) || ref;

      if (ref) {
        ref.current = instance;
        return () => (ref.current = null);
      }
    });

    return () => {
      for (const cleanup of cleanupFuncs) cleanup?.(null);
    };
  };
}
