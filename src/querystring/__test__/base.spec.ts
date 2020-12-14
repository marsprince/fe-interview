import {qs} from '../index'

describe('querystring', () => {
  test('parses a simple string', () => {
    expect(qs.parse('0=foo')).toStrictEqual({0:'foo'})
    expect(qs.parse('foo', { strictNullHandling: true })).toStrictEqual({foo:null})
    expect(qs.parse('foo')).toStrictEqual({foo:''})
    expect(qs.parse('foo=')).toStrictEqual({foo:''})
    expect(qs.parse('foo=bar')).toStrictEqual({foo:'bar'})
  })
})
