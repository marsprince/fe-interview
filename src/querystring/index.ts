import type from '../type'
import {FEI} from '../typescript';

type parseOptions = {
  strictNullHandling?: boolean
}

type Object = FEI.Object

export const qs = {
  /**
   * parse querystring like: foo=bar&bar=baz
   * @param querystring
   * @param options
   */
  parse(querystring: string, options?: parseOptions): Object {
    if(!type.isString(querystring)) {
      throw new Error('url must be string')
    }
    const result: Object = {}
    const list = querystring.split('&');
    list.forEach(item => {
      const slices = item.split('=');
      const key: string = slices[0];
      const val = slices[1];
      // only string: foo, as ''
      const defaultValue = options?.strictNullHandling ? null : ''
      result[key] = val === undefined ? defaultValue : val
    })
    return result
  },
  stringify(obj: Object) {
    let resultStr = ''
    const keys = Object.keys(obj)
    keys.forEach((key,index) => {
      resultStr+=`${key}=${obj[key]}`
      if(index !== keys.length - 1) {
        resultStr+='&'
      }
    })
    return resultStr
  }
}