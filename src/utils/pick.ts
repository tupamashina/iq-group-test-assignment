export function pick<O extends object, K extends keyof O>(
  object: O,
  keys: readonly K[],
): Pick<O, K> {
  const newObject = {} as Pick<O, K>;
  for (const key of keys) newObject[key] = object[key];
  return newObject;
}
