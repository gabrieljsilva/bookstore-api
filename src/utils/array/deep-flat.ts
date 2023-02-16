export function deepFlat<T = unknown>(arr: T[]) {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? deepFlat(cur) : cur),
    [],
  );
}
