import { FEI } from '../typescript';

export const deepClone = (initalObj: FEI.Object, finalObj: FEI.Object) => {
  const obj = finalObj || {};
  for (const i in initalObj) {
    const prop = initalObj[i];
    // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if (prop === obj) {
      continue;
    }
    if (typeof initalObj[i] === 'object') {
      obj[i] = (Array.isArray(initalObj[i])) ? [] : {};
      deepClone(initalObj[i], obj[i]);
    } else {
      obj[i] = initalObj[i];
    }
  }
  return obj;
}