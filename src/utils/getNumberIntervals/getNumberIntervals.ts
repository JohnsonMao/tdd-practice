import type {
  Interval,
  ToIntervalType,
  MergeIntervalsType,
  GetNumberIntervalsType,
} from './getNumberIntervals.type';

export const toInterval: ToIntervalType = ([start, end]) => [start, end];

/**
 * 合併重疊的數字區間
 * @param {Readonly<Interval[]>} intervals
 * @returns {Interval[]}
 */
const mergeIntervals: MergeIntervalsType = (intervals) => {
  if (!intervals.length) return [];

  const sortedIntervals = [...intervals].sort((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
  );
  let prev: Interval = [...sortedIntervals[0]];
  const result = [prev];

  for (const [start, end] of intervals) {
    if (start <= prev[1]) {
      prev[1] = Math.max(prev[1], end);
    } else {
      const current = toInterval([start, end]);
      result.push(current);
      prev = current;
    }
  }
  return result;
};

/**
 * 找出重疊與未包含的數字區間
 * @example
 * getNumberIntervals([[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]) // { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }
 */
const getNumberIntervals: GetNumberIntervalsType = (
  intervals,
  { min = 0, max = 20 } = {}
) => {
  if (!Array.isArray(intervals) || intervals.length === 0) {
    return { overlap: [], notInclude: [] };
  }

  const sortedIntervals = [...intervals].sort((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
  );
  const allOverlap = [];
  const notInclude = [];
  let [prevStart, prevEnd] = sortedIntervals[0];

  if (prevStart > min) {
    notInclude.push(toInterval([min, prevStart - 1]));
  }

  for (let i = 1; i < sortedIntervals.length; i++) {
    const [start, end] = sortedIntervals[i];
    if (start <= prevEnd) {
      prevStart = sortedIntervals[i - 1][0];
      allOverlap.push(
        toInterval([Math.max(prevStart, start), Math.min(prevEnd, end)])
      );
    } else if (start > prevEnd + 1) {
      notInclude.push(toInterval([prevEnd + 1, start - 1]));
    }
    prevEnd = Math.max(end, prevEnd);
  }

  if (prevEnd < max) {
    notInclude.push(toInterval([prevEnd + 1, max]));
  }
  return { overlap: mergeIntervals(allOverlap), notInclude };
};

export default getNumberIntervals;
