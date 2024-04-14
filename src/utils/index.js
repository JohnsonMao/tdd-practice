/**
 * 將數字加上千分位
 * @example addComma(-7855948.9527) => '-7,855,948.9527'
 *
 * @param {string | number} number
 * @returns {string}
 */
export const addComma = (number) => {
  let value = String(number).replace(/,/g, '');

  if (!/^-?\d+(\.\d+)?$/.test(value)) return '';
  if (/0\d/.test(value)) {
    value = String(Number(value));
  }

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
  let [preventStart, preventEnd] = sortedIntervals[0];

  if (preventStart > min) {
    notInclude.push([min, preventStart - 1]);
  }

  for (let i = 1; i < sortedIntervals.length; i++) {
    const [start, end] = sortedIntervals[i];
    if (start <= preventEnd) {
      if (end <= preventEnd && overlap.length) {
        for (const [overlapStart, overlapEnd] of overlap) {
          if (end < overlapStart || start > overlapEnd) {
            overlap.push([Math.max(preventStart, start), Math.min(preventEnd, end)]);
            break;
          }
        }
        preventEnd = Math.max(end, preventEnd);
        continue;
      }

      preventStart = sortedIntervals[i - 1][0];
      overlap.push([Math.max(preventStart, start), Math.min(preventEnd, end)]);
    } else if (start > preventEnd + 1) {
      notInclude.push([preventEnd + 1, start - 1]);
    }
    preventEnd = Math.max(end, preventEnd);
  }

  if (preventEnd < max) {
    notInclude.push([preventEnd + 1, max]);
  }
  return { overlap, notInclude };
};

export function generateId() {
  try {
    const uuid = crypto.randomUUID();
    return uuid;
  } catch {
    return String(Math.random());
  }
}

/**
 * 把 data 根據路徑字串塞值
 * @template T
 * @param {T} data
 * @param {string} pathString
 * @param {*} value
 * @returns {T}
 */
export function updateNestedValue(data, pathString, value) {
  const keys = pathString.split('.');
  const cloneData = JSON.parse(JSON.stringify(data));
  const lastIndex = keys.length - 1;
  let deepData = cloneData;

  for (let i = 0; i < lastIndex; i++) {
    deepData[keys[i]] = deepData[keys[i]] || {};
    deepData = deepData[keys[i]];
  }
  deepData[keys[lastIndex]] = value;

  return cloneData;
}

export const removeElementAtIndex = (index) => (list) => {
  if (!Array.isArray(list)) return list;
  const updated = list.concat();
  updated.splice(index, 1);
  return updated;
};
