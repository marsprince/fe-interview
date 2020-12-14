import type from '../type'

type parseObject = {
  [key: string]: any
}

type parseOptions = {
  strictNullHandling?: boolean
}

export const qs = {
  /**
   * parse querystring like: foo=bar&bar=baz
   * @param querystring
   * @param options
   */
  parse(querystring: string, options?: parseOptions): parseObject {
    if(!type.isString(querystring)) {
      throw new Error('url must be string')
    }
    const result: parseObject = {}
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
  }
}