import addComma from './addComma';

describe('addComma', () => {
  test.each([
    [-7855948.9527, '-7,855,948.9527'],
    [1234567890, '1,234,567,890'],
    [0, '0'],
    [0.38, '0.38'],
    [' 123 ', '123'],
  ])('should return correct value', (input, expected) => {
    expect(addComma(input)).toBe(expected);
  });

  it.each([
    ['127.0.0.1', 'Invalid Price'],
    ['0987-654321', 'Invalid Price'],
    ['0000.12340000', 'Invalid Price'],
  ])('should handle edge cases', (input, expected) => {
    expect(addComma(input)).toBe(expected);
  });
});
