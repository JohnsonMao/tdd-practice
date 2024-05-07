/* eslint-env jest */
import getNumberIntervals from './getNumberIntervals';
import { GetNumberIntervalsResult, Interval } from './getNumberIntervals.type';

describe('getNumberIntervals', () => {
  test.each<{ intervals: Interval[]; expected: GetNumberIntervalsResult }>([
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
    {
      intervals: [
        [0, 7],
        [10, 18],
        [9, 20],
      ],
      expected: {
        overlap: [[10, 18]],
        notInclude: [[8, 8]],
      },
    },
    {
      intervals: [
        [0, 7],
        [1, 6],
        [10, 18],
        [9, 20],
      ],
      expected: {
        overlap: [
          [1, 6],
          [10, 18],
        ],
        notInclude: [[8, 8]],
      },
    },
    {
      intervals: [
        [0, 3],
        [1, 6],
        [2, 20],
      ],
      expected: {
        overlap: [[1, 6]],
        notInclude: [],
      },
    },
    {
      intervals: [],
      expected: {
        overlap: [],
        notInclude: [],
      },
    },
  ])('should return correct value', ({ intervals, expected }) => {
    expect(getNumberIntervals(intervals)).toStrictEqual(expected);
  });
});
