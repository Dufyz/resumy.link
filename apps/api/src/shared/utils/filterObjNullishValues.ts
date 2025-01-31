export function filterObjNullishValues<T extends Record<string, unknown>>(
  obj: T
): T {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v === null || v === undefined) return acc;

    Object.assign(acc, {
      [k]: v,
    });
    return acc;
  }, {} as T);
}
