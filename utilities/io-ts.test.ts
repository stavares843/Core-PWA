import { expect } from '@jest/globals'
import * as io_ts from '~/utilities/io-ts'

describe('io_ts.fromEnum', () => {
  test('0', () => {
    const result: any = io_ts.fromEnum('Anas', false)
    expect(result).toMatchSnapshot()
  })

  test('1', () => {
    const result: any = io_ts.fromEnum('George', false)
    expect(result).toMatchSnapshot()
  })

  test('2', () => {
    const result: any = io_ts.fromEnum('Anas', true)
    expect(result).toMatchSnapshot()
  })

  test('3', () => {
    const result: any = io_ts.fromEnum('Michael', true)
    expect(result).toMatchSnapshot()
  })

  test('4', () => {
    const result: any = io_ts.fromEnum('Edmond', false)
    expect(result).toMatchSnapshot()
  })

  test('5', () => {
    const result: any = io_ts.fromEnum('', true)
    expect(result).toMatchSnapshot()
  })
})
