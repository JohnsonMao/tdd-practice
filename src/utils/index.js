export function generateId() {
  try {
    return crypto.randomUUID();
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

/**
 * 防抖
 * @template T
 * @template {T[]} P
 * @param {(...props: P) => void} fn
 * @param {number} delay
 * @returns {(...props: P) => void}
 */
export const debounce = (fn, delay = 150) => {
  let timer = null;

  return (...props) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...props);
    }, delay);
  };
};
