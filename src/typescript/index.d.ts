export namespace FEI {
  /**
   * Make all properties in T optional
   */
  export type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  /**
   * Make all properties in T required
   */
  export type Required<T> = {
    [P in keyof T]-?: T[P];
  };
  /**
   * Make all properties in T readonly
   */
  export type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  export type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  /**
   * Construct a type with a set of properties K of type T
   */
  export type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  /**
   * Exclude from T those types that are assignable to U
   * 取U中不存在的
   */
  export type Exclude<T, U> = T extends U ? never : T;

  /**
   * Extract from T those types that are assignable to U
   * 交集
   */
  export type Extract<T, U> = T extends U ? T : never;
}