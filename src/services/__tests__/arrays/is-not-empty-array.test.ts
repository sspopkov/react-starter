import { describe, expect, test } from '@jest/globals';
import { isNotEmptyArray } from '../../common/arrays/is-not-empty-array';

const item: number[] = [1, 2, 3];
const item2: unknown = [];
const item3: unknown = {};
const item4 = 1;
const item5: { [key: string]: number }[] = [{ id: 1 }];

describe('отправляем данные и проверяем массив ли это и есть ли в нём значения ', () => {
  test('отправляем массив и проверяем, что он не пустой', () => {
    expect(isNotEmptyArray(item)).toBeTruthy();
  });
  test('отправляем массив и проверяем, что он пустой', () => {
    expect(isNotEmptyArray(item2)).toBeFalsy();
  });
  test('отправляем объект и проверяем, что он не массив', () => {
    expect(isNotEmptyArray(item3)).toBeFalsy();
  });
  test('отправляем число и проверяем, что он не массив', () => {
    expect(isNotEmptyArray(item4)).toBeFalsy();
  });
  test('отправляем массив и проверяем, что он не пустой', () => {
    expect(isNotEmptyArray(item5)).toBeTruthy();
  });
});
