import { addComma } from '.';

describe(`addComma`, () => {
  it.each([
    [-7855948.9527, '-7,855,948.9527'],
    [1234567890, '1,234,567,890'],
    [0, '0'],
    [0.38, '0.38'],
  ])('should add comma to numbers', (input, expected) => {
    expect(addComma(input)).toBe(expected);
  });
  it.each([
    ['127.0.0.1', ''],
    ['0987-654321', ''],
  ])('should handle edge cases', (input, expected) => {
    expect(addComma(input)).toBe(expected);
  });
});
