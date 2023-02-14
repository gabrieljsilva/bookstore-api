export type DeepPartial<T> = T extends any[]
  ? T
  : T extends Record<string, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
