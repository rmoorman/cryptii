
import assert from 'assert'
import { describe, it } from 'mocha'

import ByteEncoder from '../src/ByteEncoder'

const hexTests = [
  {
    bytes: [],
    string: ''
  },
  {
    bytes: [0x00, 0x66, 0x6f, 0x6f],
    string: '00666f6f'
  }
]

const base64Tests = [
  {
    variant: 'base64',
    hex: '',
    base64: ''
  },
  {
    variant: 'base64',
    hex: '66',
    base64: 'Zg=='
  },
  {
    variant: 'base64',
    hex: '66',
    base64: 'Zg=='
  },
  {
    variant: 'base64',
    hex: '666f',
    base64: 'Zm8='
  },
  {
    variant: 'base64',
    hex: '666f6f',
    base64: 'Zm9v'
  },
  {
    variant: 'base64',
    hex: '3856b39ee48c688c',
    base64: 'OFaznuSMaIw='
  },
  {
    variant: 'base64',
    hex: '54686520717569636b2062726f776e20666f78206a75' +
         '6d7073206f766572203133206c617a7920646f67732e',
    base64: 'VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIDEzIGxhenkgZG9ncy4='
  }
]

/** @test {ByteEncoder} */
describe('ByteEncoder', () => {
  /** @test {ByteEncoder.hexStringFromBytes} */
  describe('hexStringFromBytes()', () => {
    it('should encode bytes to hex string', () => {
      hexTests.forEach(test => {
        let string = ByteEncoder.hexStringFromBytes(test.bytes)
        assert.strictEqual(string, test.string)
      })
    })
  })
  /** @test {ByteEncoder.bytesFromHexString} */
  describe('bytesFromHexString()', () => {
    it('should decode hex string to bytes', () => {
      hexTests.forEach(test => {
        let bytes = ByteEncoder.bytesFromHexString(test.string)
        assert.deepStrictEqual(Array.from(bytes), test.bytes)
      })
    })
  })
  /** @test {ByteEncoder.base64StringFromBytes} */
  describe('base64StringFromBytes()', () => {
    it('should encode bytes to base64 string', () => {
      base64Tests.forEach(test => {
        let bytes = ByteEncoder.bytesFromHexString(test.hex)
        let base64 = ByteEncoder.base64StringFromBytes(bytes, test.variant)
        assert.strictEqual(base64, test.base64)
      })
    })
  })
  /** @test {ByteEncoder.bytesFromBase64String} */
  describe('bytesFromBase64String()', () => {
    it('should decode base64 string to bytes', () => {
      base64Tests.forEach(test => {
        let bytes = ByteEncoder.bytesFromBase64String(test.base64, test.variant)
        assert.deepStrictEqual(bytes, ByteEncoder.bytesFromHexString(test.hex))
      })
    })
  })
})
