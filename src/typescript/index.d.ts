/**
 *  https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types
 *  Distributive conditional types
 *  Conditional types in which the checked type is a naked type parameter are called distributive conditional types. Distributive conditional types are automatically distributed over union types during instantiation. 
 *  For example, an instantiation of T extends U ? X : Y with the type argument A | B | C for T is resolved as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
 */
export namespace FEI {
  /**
   * copied from lib.es5
   */
  // 对接口用
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
   * Construct a type with the properties of T except for those in type K.
   */
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  // 泛用
  /**
   * Exclude from T those types that are assignable to U
   * 取U中不存在且在T中存在的
   */
  export type Exclude<T, U> = T extends U ? never : T;
  /**
   * Extract from T those types that are assignable to U
   * 交集
   */
  export type Extract<T, U> = T extends U ? T : never;
  /**
   * Exclude null and undefined from T
   */
  export type NonNullable<T> = T extends ( null | undefined ) ? never : T;

  // infer
  /**
   * Obtain the parameters of a function type in a tuple
   */
  export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
  /**
   * Obtain the parameters of a constructor function type in a tuple
   */
  export type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
  /**
   * Obtain the return type of a function type
   */
  export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  /**
   * Obtain the return type of a constructor function type
   */
  export type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
}

/**
 * own
 */
export namespace FEI {
  export type Function = (...args: any[]) => any;
  // Five years and Symbol as index still not allowed
  // https://github.com/microsoft/TypeScript/issues/1863
  export type Object = {
    [key: string]: any
  } & {
    [key: number]: any
  }
}