/**
 * 將數字加上千分位
 * @example addComma(-7855948.9527) => '-7,855,948.9527'
 *
 * @param {string | number} number
 * @returns {string}
 */
export const addComma = (number) => {
  const value = String(number);
  const numberRegExp = new RegExp('^-?\\d+(\\.\\d+)?$');

  if (!numberRegExp.test(value)) return '';

  const [integerPart, decimalPart] = value.split('.');
  const commaRegExp = new RegExp('\\B(?=(\\d{3})+$)', 'g');
  const formattedIntegerPart = integerPart.replace(commaRegExp, ',');

  if (decimalPart) {
    return formattedIntegerPart + '.' + decimalPart;
  }

  return formattedIntegerPart;
};

/** @typedef {number[]} Interval 數字區間 */
/**
 * @typedef Options
 * @prop {number} min default 0
 * @prop {number} max default 20
 */

/**
 * 找出重疊與未包含的數字區間
 * @example
 * getNumberIntervals([[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]) // { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }
 *
 *
 * @param {Readonly<Interval[]>} intervals
 * @param {Options} options
 * @returns {Record<'overlap' | 'notInclude', Interval[]>}
 */
export const getNumberIntervals = (
  intervals,
  { min, max } = { min: 0, max: 20 }
) => {
  const sortedIntervals = intervals.concat().sort((a, b) => a[0] - b[0]);
  const overlap = [];
  const notInclude = [];
  const length = sortedIntervals.length;
  let [preventStart, preventEnd] = sortedIntervals[0];

  if (preventStart > min) {
    notInclude.push([min, preventStart - 1]);
  }

  for (let i = 1; i < length; i++) {
    const [start, end] = sortedIntervals[i];

    if (start <= preventEnd) {
      if (end <= preventEnd) continue;

      preventStart = sortedIntervals[i - 1][0];
      overlap.push([Math.max(preventStart, start), Math.min(preventEnd, end)]);
    } else {
      notInclude.push([preventEnd + 1, start - 1]);
    }
    preventEnd = end;
  }

  if (preventEnd < max) {
    notInclude.push([preventEnd + 1, max]);
  }

  return { overlap, notInclude };
};
