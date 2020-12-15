interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

/**
 * 现在有一个叫 connect 的函数，它接受 EffectModule 实例，将它变成另一个对象，这个对象上只有EffectModule 的同名方法，但是方法的类型签名被改变了:
 asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
 asyncMethod<T, U>(input: T): Action<U>
 syncMethod<T, U>(action: Action<T>): Action<U>  变成了
 syncMethod<T, U>(action: T): Action<U>
 */
// 修改 Connect 的类型，让 connected 的类型变成预期的类型
// 1.筛选出方法
// 2.改写方法签名

type getMethod<T> = Pick<T, {
  [P in keyof T]: T[P] extends (...args: any) => any ? P : never
}[keyof T]>

type changeMethod<T> = {
  [P in keyof T]: T[P] extends (...args: any) => any ? changeSign<T[P]> : never
}

type getFirstParameter<T extends () => any> = Parameters<T>[0]

type changeSign<T extends () => any> =
  getFirstParameter<T> extends Promise<infer P>
    ? (ReturnType<T> extends Promise<Action<infer U>> ? (input: P, ...args: any) => Action<U> : T)
    :
    (getFirstParameter<T> extends Action<infer P>
      ? (ReturnType<T> extends Action<infer U> ? (action: P, ...args: any) => Action<U>: T)
      : T
    )

type Connect = (module: EffectModule) => changeMethod<getMethod<EffectModule>>;

const connect: Connect = m => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
