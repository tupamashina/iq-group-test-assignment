import type { ReadonlyDeep } from 'type-fest';

export function freezeDeep<const T extends object>(object: T): ReadonlyDeep<T> {
  for (const key of Reflect.ownKeys(object)) {
    const value = object[key as keyof T] as unknown;
    // As of ES6 and above, it will return `true` if a non-object argument is passed
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen#non-object_argument
    if (!Object.isFrozen(value)) freezeDeep(value as object);
  }

  return Object.freeze(object) as ReadonlyDeep<T>;
}
