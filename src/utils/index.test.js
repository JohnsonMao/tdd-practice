import { addComma, getNumberIntervals } from '.';

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

describe(`getNumberIntervals`, () => {
  it.each([
    {
      intervals: [
        [6, 11],
        [5, 8],
        [17, 20],
        [7, 7],
        [14, 17],
      ],
      expected: {
        overlap: [
          [6, 8],
          [17, 17],
        ],
        notInclude: [
          [0, 4],
          [12, 13],
        ],
      },
    },
    {
      intervals: [
        [6, 11],
        [5, 8],
        [7, 7],
        [14, 17],
      ],
      expected: {
        overlap: [[6, 8]],
        notInclude: [
          [0, 4],
          [12, 13],
          [18, 20],
        ],
      },
    },
    {
      intervals: [
        [0, 14],
        [15, 17],
      ],
      expected: {
        overlap: [],
        notInclude: [[18, 20]],
      },
    },
  ])(
    'should returns correct overlap and notInclude intervals',
    ({ intervals, expected }) => {
      expect(getNumberIntervals(intervals)).toStrictEqual(expected);
    }
  );
});
